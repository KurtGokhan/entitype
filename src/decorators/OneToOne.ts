import 'reflect-metadata';
import { ObjectType } from '../fluent';
import { PropertyExpression } from '../fluent';
import { DecoratorStorage } from 'src/context/DecoratorStorage';
import { NavigationPropertyDecorator } from 'src/decorators';




export function OneToOne<EntityType, SelectType>(propertyType: ObjectType<EntityType>): NavigationPropertyDecorator {

  let propertyDecorator = (options, target, propertyKey) => {
    options = options || {};
    let metadata = options.type || Reflect.getMetadata('design:type', target, propertyKey);

    DecoratorStorage.addColumn(target.constructor, propertyKey, metadata);
  };

  let retType = propertyDecorator.bind(null, null);
  retType['type'] = function (type) {
    return propertyDecorator.bind(null, { type });
  };

  return retType as NavigationPropertyDecorator;
}
