import { PropertyPathGetter } from './';


export declare type AggregatePropertyExpression<Entity, SelectType>
  = (expression: Entity, globalFunctions: GlobalFunctions) => SelectType;


export declare type AggregateFunction = (property?: PropertyPathGetter) => AggregatePropertyPath;

export declare type AggregatePropertyPath = { path: string[], method: AggregateFunction };
export declare type AggregatePropertyPathGetter = () => AggregatePropertyPath;
export declare type AggregatePropertyMap = AggregatePropertyPath | {
  [key: string]: AggregatePropertyMap;
};


export interface GlobalFunctions {
  Count: AggregateFunction;
  Sum: AggregateFunction;
  Avg: AggregateFunction;
  Min: AggregateFunction;
  Max: AggregateFunction;
}
