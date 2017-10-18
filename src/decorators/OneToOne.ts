import { ForwardRef, resolveType, TypeResolver } from '../common/forwardRef';
import 'reflect-metadata';
import { ObjectType, PropertyExpression } from '../fluent';
import { DecoratorStorage } from '../storage/DecoratorStorage';
import { NavigationPropertyDecorator } from '../decorators';
import { resolvePropertyExpression } from '../fluent/property-selector';


export function OneToOne<EntityType, SelectType>(
  foreignKeyEntity: TypeResolver<EntityType>,
  foreignKey: PropertyExpression<EntityType, SelectType>)
  : NavigationPropertyDecorator {

  let fkType = resolveType(foreignKeyEntity);

  let propertyDecorator = (target, propertyKey) => {
    let fk = {
      owner: fkType,
      get column() {
        return resolvePropertyExpression(foreignKey);
      }
    };

    let type = Reflect.getMetadata('design:type', target, propertyKey);

    let column = DecoratorStorage.addColumn(target.constructor, propertyKey, type, {});
    column.isNavigationProperty = true;
    column.foreignKey = fk;
    DecoratorStorage.updateEntityReferences(column.parent);
  };


  return propertyDecorator;
}
