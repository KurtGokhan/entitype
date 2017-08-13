import { SelectExpression } from '../types';
export interface IQueryable<Entity> extends IIncludable<Entity> {
}


export interface IIncludable<Entity> extends IFilterable<Entity> {
  include(): IIncludable<Entity>;
}



export interface IFilterable<Entity> extends IGroupable<Entity>, IWhereable<Entity> {
}

export interface IWhereable<Entity> {
  where(): IFiltered<Entity>;
}

export interface IFiltered<Entity> extends IFilteredFilterable<Entity>, IGroupable<Entity> {
}


export interface IFilteredFilterable<Entity> extends IGroupable<Entity> {
  readonly or: IWhereable<Entity>;
  andWhere(): IFilteredFilterable<Entity>;
}



export interface IGroupable<Entity> extends ISelectable<Entity> {
  groupBy(): IGrouped<Entity>;
}




export interface IGrouped<Entity> extends IGroupFilterable<Entity>, ISelectable<Entity> {
}

export interface IGroupFilterable<Entity> {
  having(): IGroupFiltered<Entity>;
}

export interface IGroupFiltered<Entity> extends ISelectable<Entity> {
  readonly or: IGroupFilterable<Entity>;
  andHaving(): IGroupFiltered<Entity>;
}




export interface ISelectable<Entity> extends IOrderable<Entity> {
  select<SelectType>(expression: SelectExpression<Entity, SelectType>): IOrderable<SelectType>;
}

export interface IOrderable<Entity> extends IExecutable<Entity> {
  orderByAscending(): IOrdered<Entity>;
  orderByDescending(): IOrdered<Entity>;
}

export interface IOrdered<Entity> extends IExecutable<Entity> {
  thenByAscending(): IOrdered<Entity>;
  thenByDescending(): IOrdered<Entity>;
}

export interface IExecutable<Entity> {
  toList: { (): Promise<Entity[]>; query: string; };
  first: { (): Promise<Entity>; query: string; };
  count: { (): Promise<number>; query: string; };
}
