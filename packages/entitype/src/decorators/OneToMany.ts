import 'reflect-metadata';
import { EntitypeMetadata } from '../common/EntitypeMetadata';
import { resolveType, TypeResolver } from '../common/forwardRef';
import { NavigationPropertyDecorator } from '../decorators';
import { PropertyExpression } from '../fluent';
import { resolvePropertyExpression } from '../fluent/property-selector';


export function OneToMany<EntityType, SelectType>(
  foreignKeyEntity: TypeResolver<EntityType>,
  foreignKey: PropertyExpression<EntityType, SelectType>)
  : NavigationPropertyDecorator {

  let propertyDecorator = (target, propertyKey) => {
    let fk = {
      owner: resolveType(foreignKeyEntity),
      column: resolvePropertyExpression(foreignKey)
    };

    let column = EntitypeMetadata.addColumn(target.constructor, propertyKey, null, {});
    column.isNavigationProperty = true;
    column.isArray = true;
    column.foreignKey = fk;
  };


  return propertyDecorator;
}
