import 'reflect-metadata';

import { EntitypeMetadata } from '../common/EntitypeMetadata';
import { resolveType, TypeResolver } from '../common/forwardRef';
import { DbCollectionDecorator } from './';


export function DbCollection(type: TypeResolver<any>): DbCollectionDecorator {
  let retType = (target, propertyKey) => {
    EntitypeMetadata.addDbCollection(target.constructor, propertyKey, resolveType(type));
  };

  return retType;
}
