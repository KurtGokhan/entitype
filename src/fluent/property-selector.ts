import { SelectMapping, SelectMappingStructure } from '../command/command-types/SelectCommand';
import {
  DeepPropertyExpression,
  ObjectType,
  PropertyExpression,
  PropertyMapExpression,
  PropertyMapGetter,
  PropertyPath
} from './';


const propertySelector: any = new Proxy({}, {
  get: function (target, propertyName) {
    return propertyName;
  }
});

function getDeepPropertySelector(path: PropertyPath = []) {
  return new Proxy(() => path, {
    get: function (target, propertyName: string) {
      return getDeepPropertySelector(path.concat(propertyName));
    }
  });
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
  let parameter = propertySelector as EntityType;
  let selectObject = <any>expression(parameter);
  return selectObject;
}

export function resolveDeepPropertyExpression<EntityType, SelectType>(
  expression: DeepPropertyExpression<EntityType, SelectType>): PropertyPath {
  let parameter = getDeepPropertySelector();
  let selectObject = <any>expression(parameter);
  return selectObject();
}

export function resolveDeepPropertyExpressionArray(
  expressions: ArrayLike<DeepPropertyExpression<any, any>>): PropertyPath {
  let paths = Array.from(expressions).map(x => resolveDeepPropertyExpression(x));
  let allPaths = [].concat(...paths);
  return allPaths;
}

export function resolvePropertyMapExpression<EntityType, SelectType>(
  expression: PropertyMapExpression<EntityType, SelectType>,
  entityType: ObjectType<EntityType>): [SelectMapping[], SelectMappingStructure[]] {

  let parameter = getDeepPropertySelector();
  let selectObject = <any>expression(parameter);

  return getPropertyMapping(selectObject);
}
