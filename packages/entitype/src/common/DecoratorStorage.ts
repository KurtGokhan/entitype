import { ForwardRef, resolveType, TypeResolver } from '../common/forwardRef';
import { ColumnOptions, DefaultColumnOptions, EntityOptions } from '../decorators';
import { ObjectType } from '../fluent';

export namespace DecoratorStorage {
  export class EntityError extends Error {
    constructor(public data: ContextError[], message?: string) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
  }

  export type ContextError = {
    entity: Entity;
    property: Property;
    message: string;
  };

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

    constructor(owner: ForwardRef<any>, leftKey: string, rightKey: string) {
      Object.defineProperty(this, 'owner', {
        get() {
          return findEntity(owner.type);
        }
      });
      this.leftKey = leftKey;
      this.rightKey = rightKey;
    }
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


  let entities: Entity[] = [];
  let contexts: Context[] = [];
  let errors: ContextError[] = [];

  export function addEntity(entityType: Function, options: EntityOptions): Entity {
    options = Object.assign({}, options);
    options.tableName = options.tableName || entityType.name;

    let existingEntity = findEntity(entityType);
    if (existingEntity) {
      existingEntity.dbName = options.tableName;
      existingEntity.options = options;
      return existingEntity;
    }
    else {
      let entity = new Entity({
        name: entityType.name,
        type: entityType,
        dbName: options.tableName,
        options
      });
      entities.push(entity);
      return entity;
    }
  }


  export function addColumn(parent: Function, columnName: string, metadataType: TypeResolver<any>, options: ColumnOptions): Property {
    let type = resolveType(metadataType);

    options = Object.assign({}, DefaultColumnOptions, options);
    options.columnName = options.columnName || columnName;

    let entity = findEntity(parent) || addEntity(parent, {});

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

    return column;
  }


  export function addDbCollection(parentContext: Function, propertyName: string, entityType: ObjectType<any>): DbCollection {
    let context = getContext(parentContext);
    let entity = findEntity(entityType);

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

  function findEntity(type: Function): Entity {
    return entities.find(x => x.type === type);
  }

  export function getEntity(type: Function): Entity {
    updateAllReferences();

    let entity = findEntity(type);
    if (!entity) return null;

    let entityErrors = errors.filter(x => x.entity === entity);

    if (entityErrors.length)
      throw new EntityError(entityErrors, `Requested entity '${entity.name}' has errors.`);

    return entity;
  }


  export function addContext(contextType: Function): Context {
    let ctx = new Context({
      name: contextType.name,
      type: contextType
    });
    contexts.push(ctx);
    return ctx;
  }

  export function getContext(type: Function): Context {
    return contexts.find(x => x.type === type) || addContext(type);
  }

  function updateAllReferences() {
    entities.forEach(entity => {
      entity.properties.forEach(updateForeignKeyColumns);
    });

    entities.forEach(entity => {
      entity.properties
        .filter(x => x.foreignKey && !x.type)
        .forEach(col => {
          // HACK: Due to the reflect-metadata bug in issue 12, in circular references
          // Type cannot be retrieved. Find the type by searching the counter part of this FK

          let fkCounterPart = getForeignKeyCounterPart(col);

          if (fkCounterPart) {
            col.type = fkCounterPart.parent.type;
            col.foreignKey = fkCounterPart.foreignKey;
          }
        });
    });

    validateAllReferences();
  }

  function validateAllReferences() {
    errors = [];

    entities.forEach(entity => {
      entity.properties.forEach(property => {

        if (property.isNavigationProperty) {
          let propertyType = findEntity(property.type);

          if (!propertyType) {
            errors.push({
              entity,
              property,
              message: `Property '${property.name}' of entity '${entity.name}' doesn't have a type`
            });
          }
        }

        if (property.foreignKey && !property.foreignKey.owner.type)
          errors.push({
            entity,
            property,
            message: `Cannot resolve foreign key owner for property '${property.name}' of entity '${entity.name}'`
          });
      });
    });
  }

  /**
   * If a column is navigation property, updates the foreign key for that column
   * @param column Navigation property
   */
  function updateForeignKeyColumns(column: Property) {
    if (!column.foreignKey) return;

    let entity = findEntity(column.foreignKey.owner.type);
    if (!entity) return;
    let col = entity.properties.find(x => x.name === column.foreignKey.column);

    if (col) col.isForeignKey = true;
  }

  /**
   * Get the counter part navigation property for given navigation property
   * @param baseColumn A navigation property to search counterpart for
   */
  function getForeignKeyCounterPart(baseColumn: Property): Property {
    if (!baseColumn.isNavigationProperty)
      throw new Error('Given column is not a navigation property');

    let fk = baseColumn.foreignKey;
    let baseEntity = findEntity(fk.owner.type);

    // Solves reversed cyclic references
    for (let index = 0; index < entities.length; index++) {
      let entity = entities[index];

      for (let colIndex = 0; colIndex < entity.properties.length; colIndex++) {
        let col = entity.properties[colIndex];
        if (baseColumn === col || !col.foreignKey) continue;

        let fkEntity = findEntity(col.foreignKey.owner.type);
        if (fkEntity === baseEntity && col.foreignKey.column === fk.column)
          return col;
      }
    }


    // Solves cyclic references
    for (let index = 0; index < entities.length; index++) {
      let entity = entities[index];

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
