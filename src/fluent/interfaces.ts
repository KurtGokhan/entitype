import { PropertyMapExpression, WhereExpression } from './';
import { DeepPropertyExpression } from './expressions';


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


export interface IFilteredFilterable<EntityType> extends IGroupable<EntityType> {
  readonly or: IWhereable<EntityType>;
  andWhere(expression: WhereExpression<EntityType>): IFilteredFilterable<EntityType>;
}

export interface IFiltered<EntityType> extends IFilteredFilterable<EntityType>, IGroupable<EntityType> { }

export interface IWhereable<EntityType> {
  where(expression: WhereExpression<EntityType>): IFiltered<EntityType>;
}

export interface IFilterable<EntityType> extends IGroupable<EntityType>, IWhereable<EntityType> { }


export interface IIncludable<EntityType> extends IFilterable<EntityType> {
  include<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IIncludable<EntityType>;
}


// tslint:disable-next-line:no-empty-interface
export interface IQueryable<EntityType> extends IIncludable<EntityType> { }
