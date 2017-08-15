import {
  PropertySelector,
  DeepPropertySelector,
  PropertyPath,
  ObjectType,
  PropertyMapGetter,
  DeepPropertyExpression,
  PropertyMapExpression
} from './';
import { SelectMapping } from '../command/command-types/SelectCommand';
import { getColumns, getEntity } from '../command/helpers/column-helpers';
import { DecoratorStorage } from 'src/context/DecoratorStorage';


function createPropertySelector<EntityType>(entity: ObjectType<EntityType>): PropertySelector<EntityType> {
  let parameter: PropertySelector<EntityType> = <any>{};

  let columns = getColumns(this.entityTypeOrObject);
  for (let index = 0; index < columns.length; index++) {
    let column = columns[index];

    parameter[column.name] = <any>column.dbName;
  }

  return <any>Object.freeze(parameter);
}


function createDeepPropertySelectorInternal<EntityType>(
  entityType: ObjectType<EntityType> | DecoratorStorage.Entity,
  basePath: PropertyPath,
  extend: any) {

  let selector: DeepPropertySelector<EntityType> = extend;

  let columns = getColumns(entityType);
  for (let index = 0; index < columns.length; index++) {
    let column = columns[index];

    let colPath = basePath.concat(column.name);

    let getter = <any>(() => colPath);

    Object.defineProperty(selector, column.name, {
      get() { return getter; }
    });

    let colEntity = getEntity(column.type);
    if (column.isNavigationProperty || colEntity) {
      createDeepPropertySelectorInternal(colEntity, colPath, getter);
    }
    else {
    }
  }

  return <any>Object.freeze(selector);
}


function createDeepPropertySelector<EntityType>(entityType: ObjectType<EntityType> | DecoratorStorage.Entity)
  : DeepPropertySelector<EntityType> {
  return createDeepPropertySelectorInternal(entityType, [], {});
}

function getPropertyMappingInner(map: PropertyMapGetter, baseMapPath: string[]): SelectMapping[] {
  let columns = [];

  if (typeof map === 'function') {
    columns.push({ path: map(), mapPath: baseMapPath });
  }
  else {
    for (let key in map) {
      if (map.hasOwnProperty(key)) {
        let prop = map[key];

        let childColumns = getPropertyMappingInner(prop, baseMapPath.concat(key));
        columns.push(...childColumns);
      }
    }
  }

  return columns;
}

function getPropertyMapping(map: PropertyMapGetter): SelectMapping[] {
  return getPropertyMappingInner(map, []);
}

export function resolveDeepPropertyExpression<EntityType, SelectType>(
  expression: DeepPropertyExpression<EntityType, SelectType>,
  entityType: ObjectType<EntityType>): PropertyPath {
  let parameter = createDeepPropertySelector(entityType);
  let selectObject = expression(parameter);
  return selectObject();
}

export function resolvePropertyMapExpression<EntityType, SelectType>(
  expression: PropertyMapExpression<EntityType, SelectType>,
  entityType: ObjectType<EntityType>): SelectMapping[] {

  let parameter = createDeepPropertySelector(entityType);
  let selectObject = expression(parameter);

  return getPropertyMapping(selectObject as any);
}
