import 'reflect-metadata';
import { ObjectType, PropertyExpression } from '../fluent';
import { DecoratorStorage } from '../storage/DecoratorStorage';
import { NavigationPropertyDecorator } from '../decorators';
import { resolvePropertyExpression } from '../fluent/property-selector';


export function OneToMany<EntityType, SelectType>(
  foreignKeyEntity: ObjectType<EntityType>,
  foreignKey: PropertyExpression<EntityType, SelectType>)
  : NavigationPropertyDecorator {

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
    column.isArray = true;
    // column.foreignKey = fk;
    DecoratorStorage.updateEntityReferences(column.parent);
  };


  return propertyDecorator;
}
