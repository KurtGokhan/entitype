import 'reflect-metadata';
import { ObjectType } from '../fluent';
import { DecoratorStorage } from '../storage/DecoratorStorage';
import { DbCollectionDecorator } from './';


export function DbCollection(type: ObjectType<any>): DbCollectionDecorator {
  let retType = (target, propertyKey) => {
    DecoratorStorage.addDbCollection(target.constructor, propertyKey, type);
  };

  return retType;
}
