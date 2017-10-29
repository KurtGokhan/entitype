import 'reflect-metadata';
import { DecoratorStorage } from '../common/DecoratorStorage';
import { ObjectType } from '../fluent';
import { DbCollectionDecorator } from './';


export function DbCollection(type: ObjectType<any>): DbCollectionDecorator {
  let retType = (target, propertyKey) => {
    DecoratorStorage.addDbCollection(target.constructor, propertyKey, type);
  };

  return retType;
}
