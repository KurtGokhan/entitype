import { ForwardRef, resolveType, TypeResolver } from '../common/forwardRef';
import { ColumnOptions, DefaultColumnOptions, EntityOptions } from '../decorators';
import { ObjectType } from '../fluent';

export namespace DecoratorStorage {
  export class Entity {
    type: Function;
    name: string;
    dbName: string;

    properties: Property[] = [];
    options: EntityOptions;

    get primaryKeys(): Property[] {
      return this.properties.filter(x => x.options.primaryKey);
    }

    constructor(init?: Partial<Entity>) {
      Object.assign(this, init);
    }
  }

  export class Property {
    parent: Entity;
    type: Function;
    name: string;
    dbName: string;

    isColumn: boolean = false;
    isArray: boolean = false;
    isNavigationProperty: boolean = false;
    isForeignKey: boolean = false;

    foreignKey: ForeignKey;
    manyToManyMapping: ManyToManyMapping;

    options: ColumnOptions;

    constructor(init?: Partial<Property>) {
      Object.assign(this, init);
    }
  }

  export class ForeignKey {
    owner: ForwardRef<any>;
    readonly column: string;
  }

  export class ManyToManyMapping {
    readonly owner: Entity;
    readonly leftKey: string;
    readonly rightKey: string;
  }

  export class Context {
    name: string;
    type: Function;
    collections: DbCollection[] = [];

    public constructor(init?: Partial<Context>) {
      Object.assign(this, init);
    }
  }

  export class DbCollection {
    context: Context;
    type: Function;
    name: string;
    entity: Entity;

    public constructor(init?: Partial<DbCollection>) {
      Object.assign(this, init);
    }
  }


  let targetStorage: Entity[] = [];
  let contextStorage: Context[] = [];

  export function addEntity(entityType: Function, options: EntityOptions): Entity {
    options = Object.assign({}, options);
    options.tableName = options.tableName || entityType.name;

    let entity = new Entity({
      name: entityType.name,
      type: entityType,
      dbName: options.tableName,
      options
    });
    targetStorage.push(entity);
    return entity;
  }


  export function addColumn(parent: Function, columnName: string, metadataType: TypeResolver<any>, options: ColumnOptions): Property {
    let type = resolveType(metadataType);

    options = Object.assign({}, DefaultColumnOptions, options);
    options.columnName = options.columnName || columnName;

    let entity = getEntity(parent) || addEntity(parent, {});

    let column = new Property({
      dbName: options.columnName,
      name: columnName,
      parent: entity,
      type: null,
      options: options
    });

    let setType = null;
    Object.defineProperty(column, 'type', {
      get() {
        return setType || (type as ForwardRef<any>).type;
      },
      set(value) {
        setType = value;
      }
    });

    if (!entity.properties.find(x => x.name === column.name))
      entity.properties.push(column);

    updateEntityReferences(column.parent);
    return column;
  }


  export function addDbCollection(parentContext: Function, propertyName: string, entityType: ObjectType<any>): DbCollection {
    let context = getContext(parentContext);
    let entity = getEntity(entityType);

    if (!entity) {
      // TODO: probably an error, log error
    }

    let collection = new DbCollection({
      name: propertyName,
      context: context,
      type: entityType,
      entity: entity
    });

    if (!context.collections.find(x => x.name === collection.name))
      context.collections.push(collection);
    else {
      // TODO: probably an error, log error
    }

    return collection;
  }


  export function getEntity(type: Function | Entity): Entity {
    if (typeof type === 'object')
      return type;

    for (let index = 0; index < targetStorage.length; index++) {
      let entity = targetStorage[index];
      if (entity.type === type)
        return entity;
    }
    return null;
  }


  export function addContext(contextType: Function): Context {
    let ctx = new Context({
      name: contextType.name,
      type: contextType
    });
    contextStorage.push(ctx);
    return ctx;
  }

  export function getContext(type: Function): Context {
    return contextStorage.find(x => x.type === type) || addContext(type);
  }



  /**
   * Update the owning and referencing entities to this column if there is any
   * Should be called after a navigation property is registered
   */
  export function updateColumnReferences(column: Property) {
    if (column.foreignKey) {
      let entity = getEntity(column.foreignKey.owner.type);
      if (!entity) return;
      let col = entity.properties.find(x => x.name === column.foreignKey.column);
      if (col)
        col.isForeignKey = true;
    }
  }

  export function updateEntityReferences(entity: Entity) {
    entity.properties.forEach(updateColumnReferences);
    updateAllReferences();
  }

  export function updateAllReferences() {
    targetStorage.forEach(entity => {
      entity.properties
        .filter(x => x.foreignKey && !x.type)
        .forEach(col => {
          // HACK: Due to the reflect-metadata bug in issue 12, in circular references
          // Type cannot be retrieved. Find the type by searching the counter part of this FK

          let fkCounterPart = DecoratorStorage.getForeignKeyCounterPart(col);

          if (fkCounterPart) {
            col.type = fkCounterPart.parent.type;
            col.foreignKey = fkCounterPart.foreignKey;
          }
        });
    });
  }

  export function getForeignKeyCounterPart(baseColumn: Property): Property {
    let fk = baseColumn.foreignKey;
    let baseEntity = getEntity(fk.owner.type);

    // Solves reversed cyclic references
    for (let index = 0; index < targetStorage.length; index++) {
      let entity = targetStorage[index];

      for (let colIndex = 0; colIndex < entity.properties.length; colIndex++) {
        let col = entity.properties[colIndex];
        if (baseColumn === col || !col.foreignKey) continue;

        let fkEntity = getEntity(col.foreignKey.owner.type);
        if (fkEntity === baseEntity && col.foreignKey.column === fk.column)
          return col;
      }
    }


    // Solves cyclic references
    for (let index = 0; index < targetStorage.length; index++) {
      let entity = targetStorage[index];

      for (let colIndex = 0; colIndex < entity.properties.length; colIndex++) {
        let col = entity.properties[colIndex];

        if (col.isNavigationProperty && col.foreignKey) {
          if (col.type === baseColumn.parent.type && col.foreignKey.column === fk.column) {
            return col;
          }
        }
      }
    }

    return null;
  }
}
