import { PropertyMapSelector, PropertySelector, DeepPropertySelector, PropertyPath, ObjectType } from './';
import { getColumns, getEntity } from '../command/helpers/column-helpers';
import { DecoratorStorage } from 'src/context/DecoratorStorage';

let pathSymbol = Symbol('path');

export function createPropertySelector<EntityType>(entity: ObjectType<EntityType>): PropertySelector<EntityType> {
  let parameter: PropertyMapSelector<EntityType> = <any>{};

  let columns = getColumns(this.entityTypeOrObject);
  for (let index = 0; index < columns.length; index++) {
    let column = columns[index];

    parameter[column.name] = <any>column.dbName;
  }

  return <any>Object.freeze(parameter);
}


function createDeepPropertySelectorInternal<EntityType>(
  entityType: ObjectType<EntityType> | DecoratorStorage.Entity,
  basePath: PropertyPath) {

  let selector: DeepPropertySelector<EntityType> = <any>{};

  let columns = getColumns(entityType);
  for (let index = 0; index < columns.length; index++) {
    let column = columns[index];

    let colPath = basePath.slice().concat(column.dbName);

    selector[column.name] = <any>colPath;

    if (column.isNavigationProperty) {
      let colEntity = getEntity(column.type);
      createDeepPropertySelectorInternal(colEntity, colPath);
    }
    else {
    }
  }

  return <any>Object.freeze(selector);
}


export function createDeepPropertySelector<EntityType>(entityType: ObjectType<EntityType> | DecoratorStorage.Entity)
  : DeepPropertySelector<EntityType> {
  return createDeepPropertySelectorInternal(entityType, []);
}


export function createPropertyMapSelector<EntityType>(entityType: ObjectType<EntityType>): PropertyMapSelector<EntityType> {
  let parameter: PropertyMapSelector<EntityType> = <any>{};

  let columns = getColumns(entityType);
  for (let index = 0; index < columns.length; index++) {
    let column = columns[index];

    parameter[column.name] = <any>column.dbName;
  }

  return parameter;
}
