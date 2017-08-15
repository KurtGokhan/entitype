import 'reflect-metadata';
import { ColumnDecorator } from './';
import { DecoratorStorage } from 'src/context/DecoratorStorage';


export function Column(): ColumnDecorator {


  let propertyDecorator = (options, target, propertyKey) => {
    let metadata = Reflect.getMetadata('design:type', target, propertyKey);

    DecoratorStorage.addColumn(target.constructor, propertyKey, metadata);
  };

  let retType = propertyDecorator.bind(null, null);
  retType['type'] = function (type) {
    return propertyDecorator.bind(null, { type });
  };

  return retType as ColumnDecorator;
}
