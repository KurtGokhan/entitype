export interface Queryable<Entity> {
    include(expression: IncludeExpression<Entity>): this;
    select<SelectType>(expression: SelectExpression<Entity, SelectType>): Queryable<SelectType>;
    where(expression: WhereExpression<Entity>): this;

    groupBy<GroupedType>(expression: GroupByExpression<GroupedType, Entity>): GroupedExpressionBuilder<GroupedType, Entity>;


    orderBy(expression: OrderByExpression<Entity>): this;
    orderByDescending(expression: OrderByExpression<Entity>): this;

    take(limit: number): this;
    skip(amount: number): this;


    toList: { (): Promise<Entity[]>; query: string; };
    first: { (): Promise<Entity>; query: string; };

    getQuery(): string;
}

export interface GroupedExpressionBuilder<GroupingKey, Entity> {
    toList(): Grouping<GroupingKey, Entity>;
}


export declare type OrderByExpression<Entity> = {

}

export declare type SelectExpression<Entity, SelectType> = {

}

export declare type WhereExpression<Entity> = {
    [P in keyof Entity]: WhereProperty<Entity, Entity[P]>;
}

export declare type WhereProperty<Entity, PropertyType> = {
    equals(value: PropertyType);
    gt(value: PropertyType);
    gte(value: PropertyType);
    lt(value: PropertyType);
    lte(value: PropertyType);
    between(minValue: any, maxValue: any);
    asEntity(): WhereExpression<PropertyType>;
}


export declare type GroupByExpression<Entity, GroupedType> = {

}

export declare type IncludeExpression<Entity> = {
}

export declare type Grouping<KeyType, ValueType> = {
    get(key: KeyType): ValueType[];
    toDictionary(): { key: KeyType, values: ValueType[] }[];
}






