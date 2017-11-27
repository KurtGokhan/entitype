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

function getDeepPropertySelector(path: PropertyPath = [], mentions: PropertyPath[] = []) {
  return new Proxy(() => path, {
    get: function (target, propertyName: string) {
      if (propertyName === 'map') {
        let mapFunction = expression => {
          mentions.push(path);
          return expression(getDeepPropertySelector(path, mentions));
        };
        return mapFunction;
      }

      let newPath = path.concat(propertyName);
      mentions.push(newPath);
      return getDeepPropertySelector(newPath, mentions);
    }
  });
}

function getPropertyMappingInner(map: PropertyMapGetter): PropertyPath[] {
  let columns: PropertyPath[] = [];

  if (typeof map === 'function') {
    columns.push(map());
  }
  else {
    let isArray = Array.isArray(map);
    let isObject = map && typeof map === 'object';

    if (isObject || isArray) {
      for (let key in map) {
        if (map.hasOwnProperty(key)) {
          let prop = map[key];

          let childColumns = getPropertyMappingInner(prop);
          columns.push(...childColumns);
        }
      }
    }
  }

  return columns;
}

function getPropertyMapping(map: PropertyMapGetter): PropertyPath[] {
  return getPropertyMappingInner(map);
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
  entityType: ObjectType<EntityType>): [PropertyPath[], PropertyPath[]] {

  let mentions = [];
  let parameter = getDeepPropertySelector([], mentions);
  let selectObject = <any>expression(parameter);

  let mapping = getPropertyMapping(selectObject);
  return [mapping, mentions];
}
