import { WhereCommand } from '../command/command-types/WhereCommand';

export type ObjectType<T> = { new(): T };


export declare type PropertyPath = string[];
export declare type PropertyMap = PropertyPath | {
  [key: string]: PropertyMap;
};


export declare type PropertyExpression<Entity, SelectType> = (expression: PropertySelector<Entity>) => PropertyPath;

export declare type PropertySelector<Entity> = {
  [P in keyof Entity]: PropertyPath;
};


export declare type DeepPropertyExpression<Entity, SelectType> = (expression: DeepPropertySelector<Entity>) => PropertyPath;

export declare type DeepPropertySelector<Entity> = {
  [P in keyof Entity]: DeepPropertySelector<Entity[P]> & PropertyPath;
};


export declare type PropertyMapExpression<Entity, PropertyMap> = (expression: PropertyMapSelector<Entity>) => PropertyMap;

export declare type PropertyMapSelector<Entity> = {
  [P in keyof Entity]: PropertyMapSelector<Entity[P]>;
};




export declare type WhereExpression<Entity> = (expression: WhereExpressionRoot<Entity>) => WhereCommand;


export declare type WhereExpressionRoot<Entity> = {
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

  asEntity(): WhereExpressionRoot<PropertyType>;
};
