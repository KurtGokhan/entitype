import 'reflect-metadata';
import { ObjectType, PropertyExpression } from '../fluent';
import { DecoratorStorage } from '../storage/DecoratorStorage';
import { OneToOneDecorator } from '../decorators';
import { resolvePropertyExpression } from '../fluent/property-selector';


export function OneToOne<EntityType, SelectType>(
  foreignKeyEntity: ObjectType<EntityType>,
  foreignKey: PropertyExpression<EntityType, SelectType>)
  : OneToOneDecorator {



  let propertyDecorator = (target, propertyKey) => {
    let fk = {
      owner: foreignKeyEntity,
      get column() {
        return resolvePropertyExpression(foreignKey, foreignKeyEntity);
      }
    };

    let type = Reflect.getMetadata('design:type', target, propertyKey);

    let column = DecoratorStorage.addColumn(target.constructor, propertyKey, type, {});
    column.isNavigationProperty = true;
    column.foreignKey = fk;

    DecoratorStorage.updateColumnReferences(column);
  };


  return propertyDecorator;
}
