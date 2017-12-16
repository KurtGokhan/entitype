import { DataType, DeepPropertyExpression, PropertyMapExpression } from './expressions';


export interface IListable<EntityType> {
  toList: { (): Promise<EntityType[]>; query: string; };
}

export interface ISkipped<EntityType> {
  first: { (): Promise<EntityType>; query: string; };
  take(amount: number): IListable<EntityType>;
}

export interface ITakeable<EntityType> extends IListable<EntityType>, ISkipped<EntityType> {
}

export interface ISkipable<EntityType> extends ITakeable<EntityType> {
  skip(amount: number): ISkipped<EntityType>;
}

export interface ISelectable<EntityType> extends ISkipable<EntityType> {
  count: { (): Promise<number>; query: string; };
  select<SelectType>(expression: PropertyMapExpression<EntityType, SelectType>): ISkipable<SelectType>;
}

export interface IOrderable<EntityType> extends ISelectable<EntityType> {
  orderByAscending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType>;
  orderByDescending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType>;
}

export interface IOrdered<EntityType> extends ISelectable<EntityType> {
  thenByAscending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType>;
  thenByDescending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType>;
}

export interface IFiltered<EntityType> extends IOrderable<EntityType> {
  readonly or: IWhereable<EntityType>;
  andWhere<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IFilterCondition<EntityType, SelectType>;
}

export interface IFilterCondition<EntityType, PropertyType> {
  readonly not: IFilterCondition<EntityType, PropertyType>;

  equals(value: PropertyType): IFiltered<EntityType>;
  greaterThan(value: PropertyType): IFiltered<EntityType>;
  greaterThanOrEqual(value: PropertyType): IFiltered<EntityType>;
  lessThan(value: PropertyType): IFiltered<EntityType>;
  lessThanOrEqual(value: PropertyType): IFiltered<EntityType>;
  between(minValue: PropertyType, maxValue: PropertyType): IFiltered<EntityType>;
  like(value: string): IFiltered<EntityType>;
  isNull(): IFiltered<EntityType>;
  in(array: PropertyType[]): IFiltered<EntityType>;
}

export interface ITableFilterCondition<EntityType, PropertyType> {
  readonly not: ITableFilterCondition<EntityType, PropertyType>;
  isNull(): IFiltered<EntityType>;
}

export interface IWhereable<EntityType> {
  where<SelectType extends DataType>(expression: DeepPropertyExpression<EntityType, SelectType>): IFilterCondition<EntityType, SelectType>;
  where<SelectType extends Function>(expression: DeepPropertyExpression<EntityType, SelectType>): void;
  where<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): ITableFilterCondition<EntityType, SelectType>;
}

export interface IFilterable<EntityType> extends IOrderable<EntityType>, IWhereable<EntityType> { }


export interface IIncludable<EntityType> extends IFilterable<EntityType> {
  include<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IIncludable<EntityType>;

  include<Level1Type, SelectType>(
    expression1: DeepPropertyExpression<EntityType, Level1Type[]>,
    expression2: DeepPropertyExpression<Level1Type, SelectType>): IIncludable<EntityType>;

  include<Level1Type, Level2Type, SelectType>(
    expression1: DeepPropertyExpression<EntityType, Level1Type[]>,
    expression2: DeepPropertyExpression<Level1Type, Level2Type[]>,
    expression3: DeepPropertyExpression<Level2Type, SelectType>): IIncludable<EntityType>;
}


// tslint:disable-next-line:no-empty-interface
export interface IQueryable<EntityType> extends IIncludable<EntityType> { }
