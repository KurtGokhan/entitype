import { WhereCommand } from '../command/command-types/WhereCommand';

export type ObjectType<T> = { new(): T };


export declare type PropertyPath = string[];
export declare type PropertyPathGetter = () => string[];
export declare type PropertyMap = PropertyPath | {
  [key: string]: PropertyMap;
};

export declare type PropertyMapGetter = PropertyPathGetter | {
  [key: string]: PropertyMapGetter;
};

export declare type PropertyExpression<Entity, SelectType> = (expression: PropertySelector<Entity>) => SelectType;

export declare type PropertySelector<Entity> = {
  [P in keyof Entity]: Entity[P];
};


export declare type DeepPropertyExpression<Entity, SelectType> = (expression: DeepPropertySelector<Entity>) => SelectType;

export declare type DeepPropertySelector<Entity> = {
  [P in keyof Entity]: DeepPropertySelector<Entity[P]>;
};


export declare type PropertyMapExpression<Entity, SelectType> = (expression: DeepPropertySelector<Entity>) => SelectType;


export declare type WhereExpression<Entity> = (expression: WhereProperty<Entity>) => WhereCommand;


export declare type WhereProperty<Entity> = {
  [P in keyof Entity]: WhereProperty<Entity[P]>;
} & { (): WhereConditionBuilder<Entity> };


export declare type WhereConditionBuilder<PropertyType> = {
  not: WhereConditionBuilder<PropertyType>;

  equals(value: PropertyType): WhereCommand;
  gt(value: PropertyType): WhereCommand;
  gte(value: PropertyType): WhereCommand;
  lt(value: PropertyType): WhereCommand;
  lte(value: PropertyType): WhereCommand;
  between(minValue: PropertyType, maxValue: PropertyType): WhereCommand;
  like(value: string): WhereCommand;
  isNull(): WhereCommand;
  in(array: PropertyType[]): WhereCommand;
};
