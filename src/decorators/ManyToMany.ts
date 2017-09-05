import { NavigationPropertyDecorator } from './';
import { resolvePropertyExpression } from '../fluent/property-selector';
import { ObjectType, PropertyExpression } from '../fluent';
import { DecoratorStorage } from 'src/storage/DecoratorStorage';

export function ManyToMany<ArrayType, JoinTableType, LeftKeyType, RightKeyType>(
  arrayType: ObjectType<ArrayType>,
  joinTableType: ObjectType<JoinTableType>,
  leftKey: PropertyExpression<JoinTableType, LeftKeyType>,
  rightKey?: PropertyExpression<JoinTableType, RightKeyType>)
  : NavigationPropertyDecorator {

  let propertyDecorator = (target, propertyKey) => {
    let fk = {
      owner: joinTableType,
      get leftKey() {
        return resolvePropertyExpression(leftKey, joinTableType);
      },
      get rightKey() {
        return resolvePropertyExpression(rightKey, joinTableType);
      }
    };

    let type = arrayType;

    let column = DecoratorStorage.addColumn(target.constructor, propertyKey, type, {});
    column.isNavigationProperty = true;
    column.isArray = true;
    column.manyToManyMapping = fk;

    DecoratorStorage.updateColumnReferences(column);
  };


  return propertyDecorator;
}
