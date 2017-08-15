import { WhereCommand } from '../command/command-types/WhereCommand';


export interface GroupedExpressionBuilder<GroupingKey, Entity> {
  toList(): Grouping<GroupingKey, Entity>;
}


export declare type SelectExpression<Entity, SelectType> = (expression: SelectExpressionQuery<Entity, Entity>) => SelectType;

export declare type SelectExpressionQuery<BaseEntity, Entity> = {
  [P in keyof Entity]: SelectExpressionQuery<BaseEntity, Entity[P]>;
};


export declare type WhereExpression<Entity> = (expression: WhereExpressionQuery<Entity>) => WhereCommand;

export declare type WhereExpressionQuery<Entity> = {
  [P in keyof Entity]: WhereProperty<Entity, Entity[P]>;
};


export declare type WhereProperty<Entity, PropertyType> = {
  not: WhereProperty<Entity, PropertyType>;

  equals(value: PropertyType): WhereCommand;
  gt(value: PropertyType): WhereCommand;
  gte(value: PropertyType): WhereCommand;
  lt(value: PropertyType): WhereCommand;
  lte(value: PropertyType): WhereCommand;
  between(minValue: PropertyType, maxValue: PropertyType): WhereCommand;
  like(value: string): WhereCommand;
  isNull(): WhereCommand;
  in(array: PropertyType[]): WhereCommand;

  asEntity(): WhereExpressionQuery<PropertyType>;
};



export declare type GroupByExpression<Entity, GroupedType> = {

};


export declare type Grouping<KeyType, ValueType> = {
  get(key: KeyType): ValueType[];
  toDictionary(): { key: KeyType, values: ValueType[] }[];
};
