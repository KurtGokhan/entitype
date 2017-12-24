import 'reflect-metadata';

import { DecoratorStorage } from '../common/DecoratorStorage';
import { resolveType, TypeResolver } from '../common/forwardRef';
import { DbCollectionDecorator } from './';


export function DbCollection(type: TypeResolver<any>): DbCollectionDecorator {
  let retType = (target, propertyKey) => {
    DecoratorStorage.addDbCollection(target.constructor, propertyKey, resolveType(type));
  };

  return retType;
}
