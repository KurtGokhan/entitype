import { DecoratorStorage } from '../common/DecoratorStorage';
import { resolveType, TypeResolver } from '../common/forwardRef';
import { PropertyExpression } from '../fluent';
import { resolvePropertyExpression } from '../fluent/property-selector';
import { NavigationPropertyDecorator } from './';

export function ManyToMany<ArrayType, JoinTableType, LeftKeyType, RightKeyType>(
  arrayType: TypeResolver<ArrayType>,
  joinTableType: TypeResolver<JoinTableType>,
  leftKey: PropertyExpression<JoinTableType, LeftKeyType>,
  rightKey?: PropertyExpression<JoinTableType, RightKeyType>)
  : NavigationPropertyDecorator {

  let propertyDecorator = (target, propertyKey) => {
    let joinTypeResolved = resolveType(joinTableType);

    let fk = {
      get owner() {
        return DecoratorStorage.getEntity(joinTypeResolved.type);
      },
      leftKey: resolvePropertyExpression(leftKey),
      rightKey: resolvePropertyExpression(rightKey)
    };

    let column = DecoratorStorage.addColumn(target.constructor, propertyKey, arrayType, {});
    column.isNavigationProperty = true;
    column.isArray = true;
    column.manyToManyMapping = fk;
    DecoratorStorage.updateEntityReferences(column.parent);
  };


  return propertyDecorator;
}
