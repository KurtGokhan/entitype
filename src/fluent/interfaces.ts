import { DeepPropertyExpression, PropertyMapExpression } from './expressions';


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


export interface IOrderable<EntityType> extends ISkipable<EntityType> {
  orderByAscending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType>;
  orderByDescending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType>;
}

export interface IOrdered<EntityType> extends ISkipable<EntityType> {
  thenByAscending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType>;
  thenByDescending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType>;
}


export interface ISelectable<EntityType> extends IOrderable<EntityType> {
  count: { (): Promise<number>; query: string; };
  select<SelectType>(expression: PropertyMapExpression<EntityType, SelectType>): IOrderable<SelectType>;
}


export interface IGroupFilterable<EntityType> {
  having(): IGroupFiltered<EntityType>;
}

export interface IGroupFiltered<EntityType> extends ISelectable<EntityType> {
  readonly or: IGroupFilterable<EntityType>;
  andHaving(): IGroupFiltered<EntityType>;
}

export interface IGrouped<EntityType> extends IGroupFilterable<EntityType>, ISelectable<EntityType> { }

export interface IGroupable<EntityType> extends ISelectable<EntityType> {
  groupBy(): IGrouped<EntityType>;
}


export interface IFiltered<EntityType> extends ISelectable<EntityType> {
  readonly or: IWhereable<EntityType>;
  andWhere<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IFilterCondition<EntityType, SelectType>;
}

export interface IFilterCondition<EntityType, PropertyType> {
  readonly not: IFilterCondition<EntityType, PropertyType>;

  equals(value: PropertyType): IFiltered<EntityType>;
  gt(value: PropertyType): IFiltered<EntityType>;
  gte(value: PropertyType): IFiltered<EntityType>;
  lt(value: PropertyType): IFiltered<EntityType>;
  lte(value: PropertyType): IFiltered<EntityType>;
  between(minValue: PropertyType, maxValue: PropertyType): IFiltered<EntityType>;
  like(value: string): IFiltered<EntityType>;
  isNull(): IFiltered<EntityType>;
  in(array: PropertyType[]): IFiltered<EntityType>;
}

export interface IWhereable<EntityType> {
  where<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IFilterCondition<EntityType, SelectType>;
}

export interface IFilterable<EntityType> extends ISelectable<EntityType>, IWhereable<EntityType> { }


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
