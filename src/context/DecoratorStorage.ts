
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
    type: string;
    name: string;
    dbName: string;

    isArray: boolean = false;
    isNavigationProperty: boolean = false;
    isForeignKey: boolean = false;

    constructor(init?: Partial<Column>) {
      Object.assign(this, init);
    }
  }

  let targetStorage: { [key: string]: Entity } = {};

  export function addEntity(entity: Function): Entity {
    return targetStorage[entity.name] = new Entity({
      name: entity.name,
      type: entity,
      dbName: entity.name
    });
  }


  export function addColumn(parent: Function, columnName: string, metadataType: any): Column {
    let type = 'int';
    if (metadataType) {
      type = metadataType;
    }

    let entity = targetStorage[parent.name] || addEntity(parent);

    let column = new Column({
      dbName: columnName.toString(),
      name: columnName,
      parent: entity,
      type: type
    });

    // TODO: Multiple columns with same name is added because of mocha. Find a way to seperate decorators.
    if (!entity.columns.find(x => x.name === column.name))
      entity.columns.push(column);

    return column;
  }

  export function getEntity(type: Function | string): Entity {
    let entity = null;
    if (typeof type === 'string') {
      entity = targetStorage[type];
    }
    else {
      entity = targetStorage[type.name];
    }
    return entity;
  }
}
