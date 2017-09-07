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
import { SelectMapping, SelectMappingStructure } from '../command/command-types/SelectCommand';
import { DecoratorStorage } from '../storage/DecoratorStorage';


function createPropertySelector<EntityType>(entityType: ObjectType<EntityType>): PropertySelector<EntityType> {
  return <any>new Proxy({}, {
    get: function (target, propertyName) {
      return propertyName;
    }
  });
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
    let isGetterInitialized = false;

    Object.defineProperty(selector, column.name, {
      get() {

        if (column.isNavigationProperty && !isGetterInitialized) {
          let colEntity = DecoratorStorage.getEntity(column.type);

          createDeepPropertySelectorInternal(colEntity, colPath, getter);
          isGetterInitialized = true;
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

function getPropertyMappingInner(map: PropertyMapGetter, baseMapPath: string[]): [SelectMapping[], SelectMappingStructure[]] {
  let columns: SelectMapping[] = [];
  let structure: SelectMappingStructure[] = [];

  if (typeof map === 'function') {
    columns.push({ path: map(), mapPath: baseMapPath });
  }
  else {
    let isArray = Array.isArray(map);
    let isObject = map && typeof map === 'object';
    let st = { isArray, isObject, mapPath: baseMapPath, value: map };
    structure.push(st);

    if (isObject || isArray) {
      for (let key in map) {
        if (map.hasOwnProperty(key)) {
          let prop = map[key];

          let childColumns = getPropertyMappingInner(prop, baseMapPath.concat(key));
          columns.push(...childColumns[0]);
          structure.push(...childColumns[1]);
        }
      }
    }
  }

  return [columns, structure];
}

function getPropertyMapping(map: PropertyMapGetter): [SelectMapping[], SelectMappingStructure[]] {
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
  entityType: ObjectType<EntityType>): [SelectMapping[], SelectMappingStructure[]] {

  let parameter = createDeepPropertySelector(entityType);
  let selectObject = <any>expression(parameter);

  return getPropertyMapping(selectObject);
}
