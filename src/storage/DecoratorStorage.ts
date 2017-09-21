import { ColumnOptions } from '../decorators';
import { ObjectType } from '../fluent';

export namespace DecoratorStorage {
  export class Entity {
    type: Function;
    name: string;
    dbName: string;

    columns: Column[] = [];

    constructor(init?: Partial<Entity>) {
      Object.assign(this, init);
    }
  }

  export class Column {
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

    constructor(init?: Partial<Column>) {
      Object.assign(this, init);
    }
  }

  export class ForeignKey {
    owner: ObjectType<any>;
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

  export function addEntity(entityType: Function): Entity {
    let entity = new Entity({
      name: entityType.name,
      type: entityType,
      dbName: entityType.name
    });
    targetStorage.push(entity);
    return entity;
  }


  export function addColumn(parent: Function, columnName: string, metadataType: any, options: ColumnOptions): Column {
    let type = metadataType;

    let entity = getEntity(parent) || addEntity(parent);

    let column = new Column({
      dbName: columnName.toString(),
      name: columnName,
      parent: entity,
      type: type,
      options: options
    });

    if (!entity.columns.find(x => x.name === column.name))
      entity.columns.push(column);

    updateEntityReferences(column.parent);
    return column;
  }


  export function addDbCollection(parentContext: Function, propertyName: string, entityType: ObjectType<any>): DbCollection {
    let context = getContext(parentContext) || addContext(parentContext);
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

  export function getContext(type: Function | Context): Context {
    if (typeof type === 'object' && type instanceof Context)
      return type;

    for (let index = 0; index < contextStorage.length; index++) {
      let context = contextStorage[index];
      if (context.type === type)
        return context;
    }
    return null;
  }


  /**
   * Update the owning and referencing entities to this column if there is any
   * Should be called after a navigation property is registered
   *
   * @export
   * @param {Column} column
   */
  export function updateColumnReferences(column: Column) {
    if (column.foreignKey) {
      let entity = getEntity(column.foreignKey.owner);
      if (!entity) {
        console.warn(
          `Foreign key owner could not be resolved for column '${column.name}' on entity '${column.parent.name}' due to cyclic references.`,
          `Use forwardRef for better support.`
        );
        return;
      }
      let col = entity.columns.find(x => x.name === column.foreignKey.column);
      if (col)
        col.isForeignKey = true;
    }
  }

  export function updateEntityReferences(entity: Entity) {
    entity.columns.forEach(updateColumnReferences);
    updateAllReferences();
  }

  export function updateAllReferences() {
    targetStorage.forEach(entity => {
      entity.columns.forEach(col => {
        if (!col.foreignKey) return;
        if (!col.type) {
          // HACK: Due to the reflect-metadata bug in issue 12, in circular references
          // Type cannot be retrieved. Find the type by searching the counter part of this FK

          let fkCounterPart = DecoratorStorage.getForeignKeyCounterPart(col);

          if (fkCounterPart) {
            col.type = fkCounterPart.parent.type;
            col.foreignKey = fkCounterPart.foreignKey;
          }
        }
      });
    });
  }

  export function getForeignKeyCounterPart(baseColumn: Column): Column {
    let fk = baseColumn.foreignKey;
    let baseEntity = getEntity(fk.owner);

    // Solves reversed cyclic references
    for (let index = 0; index < targetStorage.length; index++) {
      let entity = targetStorage[index];

      for (let colIndex = 0; colIndex < entity.columns.length; colIndex++) {
        let col = entity.columns[colIndex];
        if (baseColumn === col || !col.foreignKey) continue;

        let fkEntity = getEntity(col.foreignKey.owner);
        if (fkEntity === baseEntity && col.foreignKey.column === fk.column)
          return col;
      }
    }


    // Solves cyclic references
    for (let index = 0; index < targetStorage.length; index++) {
      let entity = targetStorage[index];

      for (let colIndex = 0; colIndex < entity.columns.length; colIndex++) {
        let col = entity.columns[colIndex];

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
