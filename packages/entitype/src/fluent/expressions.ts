export type ObjectType<T> = { new(): T };

export type DataType = string | boolean | number | Date;


export declare type PropertyPath = string[];
export declare type PropertyPathGetter = () => string[];
export declare type PropertyMap = PropertyPath | {
  [key: string]: PropertyMap;
};

export declare type PropertyMapGetter = PropertyPathGetter | {
  [key: string]: PropertyMapGetter;
};

export declare type PropertyExpression<Entity, SelectType> = (expression: Entity) => SelectType;

export declare type PropertyMapExpression<Entity, SelectType> = (expression: Entity) => SelectType;

export declare type DeepPropertyExpression<Entity, SelectType> = (expression: Entity) => SelectType;
