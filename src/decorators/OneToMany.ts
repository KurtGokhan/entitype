import 'reflect-metadata';
import { resolveType } from '../common/forwardRef';
import { NavigationPropertyDecorator } from '../decorators';
import { ObjectType, PropertyExpression } from '../fluent';
import { resolvePropertyExpression } from '../fluent/property-selector';
import { DecoratorStorage } from '../storage/DecoratorStorage';


export function OneToMany<EntityType, SelectType>(
  foreignKeyEntity: ObjectType<EntityType>,
  foreignKey: PropertyExpression<EntityType, SelectType>)
  : NavigationPropertyDecorator {

  let propertyDecorator = (target, propertyKey) => {
    let fk = {
      owner: resolveType(() => foreignKeyEntity),
      column: resolvePropertyExpression(foreignKey)
    };

    let column = DecoratorStorage.addColumn(target.constructor, propertyKey, null, {});
    column.isNavigationProperty = true;
    column.isArray = true;
    column.foreignKey = fk;
    DecoratorStorage.updateEntityReferences(column.parent);
  };


  return propertyDecorator;
}
