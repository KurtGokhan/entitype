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

export declare type PropertyExpression<Entity, SelectType> = (expression: PropertySelector<Entity>) => any;

export declare type PropertySelector<Entity> = {
  [P in keyof Entity]: any;
};


export declare type DeepPropertyExpression<Entity, SelectType> = (expression: DeepPropertySelector<Entity>) => PropertyPathGetter;

export declare type DeepPropertySelector<Entity> = {
  [P in keyof Entity]: DeepPropertySelector<Entity[P]>;
};


export declare type PropertyMapExpression<Entity, SelectType> = (expression: DeepPropertySelector<Entity>) => SelectType;


export declare type WhereExpression<Entity> = (expression: WhereSelector<Entity>) => WhereCommand;


export declare type WhereSelector<Entity> = {
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

  asEntity(): WhereSelector<PropertyType>;
};
