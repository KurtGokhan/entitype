import 'reflect-metadata';
import { ObjectType, PropertyExpression } from '../fluent';
import { DecoratorStorage } from 'src/storage/DecoratorStorage';
import { OneToOneDecorator } from 'src/decorators';
import { resolvePropertyExpression } from 'src/fluent/property-selector';


export function OneToOne<EntityType, SelectType>(
  foreignKeyEntity: ObjectType<EntityType>,
  foreignKey: PropertyExpression<EntityType, SelectType>)
  : OneToOneDecorator {



  let propertyDecorator = (target, propertyKey) => {
    let type = Reflect.getMetadata('design:type', target, propertyKey);

    let column = DecoratorStorage.addColumn(target.constructor, propertyKey, type);
    column.isNavigationProperty = true;
    column.foreignKey = {
      entity: foreignKeyEntity,
      column: resolvePropertyExpression(foreignKey, foreignKeyEntity)
    };
  };


  return propertyDecorator;
}
