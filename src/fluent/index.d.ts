import { WhereCommand } from '../command/command-types/WhereCommand';

export type ObjectType<T> = { new(): T };

export declare type PropertyPath = string[];
export declare type PropertyMap = PropertyPath | {
  [key: string]: PropertyMap;
};


export declare type PropertyExpression<Entity, SelectType> = (expression: PropertyExpressionRoot<Entity, Entity>) => PropertyPath;

export declare type PropertyExpressionRoot<BaseEntity, Entity> = {
  [P in keyof Entity]: PropertyPath;
};


export declare type DeepPropertyExpression<Entity, SelectType> = (expression: PropertyMapExpressionRoot<Entity, Entity>) => PropertyPath;

export declare type DeepPropertyExpressionRoot<BaseEntity, Entity> = {
  [P in keyof Entity]: PropertyMapExpressionRoot<BaseEntity, Entity[P]> | PropertyPath;
};


export declare type PropertyMapExpression<Entity, PropertyMap> = (expression: PropertyMapExpressionRoot<Entity, Entity>) => PropertyMap;

export declare type PropertyMapExpressionRoot<BaseEntity, Entity> = {
  [P in keyof Entity]: PropertyMapExpressionRoot<BaseEntity, Entity[P]>;
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
