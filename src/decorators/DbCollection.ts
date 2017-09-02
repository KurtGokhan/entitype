import { DbCollectionDecorator } from './';
import { ObjectType } from '../fluent';
import 'reflect-metadata';
import { ColumnDecorator, ColumnOptions } from './';
import { DecoratorStorage } from '../storage/DecoratorStorage';


export function DbCollection(type: ObjectType<any>): DbCollectionDecorator {
  let retType = (target, propertyKey) => {
    DecoratorStorage.addDbCollection(target.constructor, propertyKey, type);
  };

  return retType;
}
