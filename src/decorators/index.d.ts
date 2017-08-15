import { PropertyExpression } from '../fluent';

export type ColumnDecorator = PropertyDecorator & { type: (string) => PropertyDecorator };

export type NavigationPropertyDecorator<EntityType> = PropertyDecorator & {
  type(string): NavigationPropertyDecorator<EntityType>;
  mapTo<SelectType>(expression?: PropertyExpression<EntityType, SelectType>): NavigationPropertyDecorator<EntityType>;
};
