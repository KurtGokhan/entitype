

export interface GroupedExpressionBuilder<GroupingKey, Entity> {
  toList(): Grouping<GroupingKey, Entity>;
}


export declare type OrderByExpression<Entity> = {

}

export declare type SelectExpression<Entity, SelectType> = {

}

export declare type WhereExpression<Entity> = {
  [P in keyof Entity]: WhereProperty<Entity, Entity[P]>;
}

export declare type WhereProperty<Entity, PropertyType> = {
  equals(value: PropertyType);
  gt(value: PropertyType);
  gte(value: PropertyType);
  lt(value: PropertyType);
  lte(value: PropertyType);
  between(minValue: any, maxValue: any);
  like(value: string);
  asEntity(): WhereExpression<PropertyType>;
}


export declare type GroupByExpression<Entity, GroupedType> = {

}

export declare type IncludeExpression<Entity> = {
}

export declare type Grouping<KeyType, ValueType> = {
  get(key: KeyType): ValueType[];
  toDictionary(): { key: KeyType, values: ValueType[] }[];
}






