import { ColumnOptions } from 'src/decorators';
import { PropertyExpression, ObjectType } from 'src/fluent';
import { resolvePropertyExpression } from 'src/fluent/property-selector';

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

    isArray: boolean = false;
    isNavigationProperty: boolean = false;
    isForeignKey: boolean = false;

    foreignKey: ForeignKey;

    options: ColumnOptions;

    constructor(init?: Partial<Column>) {
      Object.assign(this, init);
    }
  }

  export class ForeignKey {
    owner: ObjectType<any>;
    readonly column: string;
  }

  let targetStorage: Entity[] = [];

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
    let type = Number;
    if (metadataType) {
      type = metadataType;
    }

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
      let col = entity.columns.find(x => x.name === column.foreignKey.column);
      if (col)
        col.isForeignKey = true;
    }
  }

  export function updateEntityReferences(entity: Entity) {
    entity.columns.forEach(updateColumnReferences);
  }
}
