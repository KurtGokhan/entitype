import { DataType, PropertyExpression } from './';

export interface ISetable<EntityType> {
  set(entry: Partial<EntityType>): Promise<void>;
}

export interface ISetFiltered<EntityType> extends ISetable<EntityType> {
  readonly or: ISetFilterable<EntityType>;
  readonly and: ISetFilterable<EntityType>;
}

export interface ISetFilterCondition<EntityType, PropertyType> {
  readonly not: this;

  equals(value: PropertyType): ISetFiltered<EntityType>;
  greaterThan(value: PropertyType): ISetFiltered<EntityType>;
  greaterThanOrEqual(value: PropertyType): ISetFiltered<EntityType>;
  lessThan(value: PropertyType): ISetFiltered<EntityType>;
  lessThanOrEqual(value: PropertyType): ISetFiltered<EntityType>;
  between(minValue: PropertyType, maxValue: PropertyType): ISetFiltered<EntityType>;
  like(value: string): ISetFiltered<EntityType>;
  isNull(): ISetFiltered<EntityType>;
  in(array: PropertyType[]): ISetFiltered<EntityType>;
}


export interface ISetFilterable<EntityType> {
  when<SelectType extends DataType>(expression: PropertyExpression<EntityType, SelectType>): ISetFilterCondition<EntityType, SelectType>;
  when<SelectType extends Function>(expression: PropertyExpression<EntityType, SelectType>): void;
  when<SelectType>(expression: PropertyExpression<EntityType, SelectType>): void;
}

export interface ICollection<EntityType> extends ISetFilterable<EntityType> {
  /**
  * Inserts a new entry to the database
  */
  insert(entry: EntityType): Promise<EntityType>;

  /**
   * Updates an entry or inserts if it does not exist in the database
   */
  persist(entry: EntityType): Promise<EntityType>;

  /**
   * Updates an entry and saves changes to the database
   */
  update(entry: Partial<EntityType>): Promise<EntityType>;
}
