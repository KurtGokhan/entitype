import {
  PropertySelector,
  DeepPropertySelector,
  PropertyPath,
  ObjectType,
  PropertyMapGetter,
  DeepPropertyExpression,
  PropertyMapExpression,
  PropertyExpression
} from './';
import { SelectMapping } from '../command/command-types/SelectCommand';
import { DecoratorStorage } from '../storage/DecoratorStorage';


function createPropertySelector<EntityType>(entityType: ObjectType<EntityType>): PropertySelector<EntityType> {
  let parameter: PropertySelector<EntityType> = <any>{};

  let entity = DecoratorStorage.getEntity(entityType);
  let columns = entity.columns;
  for (let index = 0; index < columns.length; index++) {
    let column = columns[index];

    parameter[<any>column.name] = <any>column.name;
  }

  return <any>Object.freeze(parameter);
}


function createDeepPropertySelectorInternal<EntityType>(
  entityType: ObjectType<EntityType> | DecoratorStorage.Entity,
  basePath: PropertyPath,
  extend: any) {

  let selector: DeepPropertySelector<EntityType> = extend;

  let entity = DecoratorStorage.getEntity(entityType);
  let columns = entity.columns;
  for (let index = 0; index < columns.length; index++) {
    let column = columns[index];

    let colPath = basePath.concat(column.name);

    let getter = <any>(() => colPath);

    Object.defineProperty(selector, column.name, {
      get() {

        if (column.isNavigationProperty) {
          let colEntity = DecoratorStorage.getEntity(column.type);

          createDeepPropertySelectorInternal(colEntity, colPath, getter);
        }

        return getter;
      }
    });

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

export function resolvePropertyExpression<EntityType, SelectType>(
  expression: PropertyExpression<EntityType, SelectType>,
  entityType: ObjectType<EntityType>): string {
  let parameter = createPropertySelector(entityType);
  let selectObject = <any>expression(parameter);
  return selectObject;
}

export function resolveDeepPropertyExpression<EntityType, SelectType>(
  expression: DeepPropertyExpression<EntityType, SelectType>,
  entityType: ObjectType<EntityType>): PropertyPath {
  let parameter = createDeepPropertySelector(entityType);
  let selectObject = <any>expression(parameter);
  return selectObject();
}

export function resolvePropertyMapExpression<EntityType, SelectType>(
  expression: PropertyMapExpression<EntityType, SelectType>,
  entityType: ObjectType<EntityType>): SelectMapping[] {

  let parameter = createDeepPropertySelector(entityType);
  let selectObject = <any>expression(parameter);

  return getPropertyMapping(selectObject);
}
