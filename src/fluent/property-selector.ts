import { SelectMapping, SelectMappingStructure } from '../command/command-types/SelectCommand';
import { DecoratorStorage } from '../storage/DecoratorStorage';
import {
  DeepPropertyExpression,
  DeepPropertySelector,
  ObjectType,
  PropertyExpression,
  PropertyMapExpression,
  PropertyMapGetter,
  PropertyPath,
  PropertySelector
} from './';


const propertySelector: PropertySelector<any> = new Proxy({}, {
  get: function (target, propertyName) {
    return propertyName;
  }
});



function createDeepPropertySelectorInternal<EntityType>(
  entityType: ObjectType<EntityType> | DecoratorStorage.Entity,
  basePath: PropertyPath,
  extend: any) {
  // TODO: use proxies

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
    let st: SelectMappingStructure = { isArray, isObject, mapPath: baseMapPath, value: map };
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
  expression: PropertyExpression<EntityType, SelectType>): string {
  let parameter = propertySelector as PropertySelector<EntityType>;
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
