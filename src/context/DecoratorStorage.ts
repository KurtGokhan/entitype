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

    constructor(init?: Partial<Column>) {
      Object.assign(this, init);
    }
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


  export function addColumn(parent: Function, columnName: string, metadataType: any): Column {
    let type = Number;
    if (metadataType) {
      type = metadataType;
    }

    let entity = getEntity(parent) || addEntity(parent);

    let column = new Column({
      dbName: columnName.toString(),
      name: columnName,
      parent: entity,
      type: type
    });

    if (!entity.columns.find(x => x.name === column.name))
      entity.columns.push(column);

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
}
