
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
