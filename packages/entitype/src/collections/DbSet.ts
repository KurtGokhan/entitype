import { GroupedExpressionBuilder, IncludeExpression, OrderByExpression, Queryable, WhereExpression } from '../fluent/types';

export class DbSet<Entity> implements Queryable<Entity>{

    toList: { (): Promise<Entity[]>; query: string; };
    first: { (): Promise<Entity>; query: string; };

    include(expression: IncludeExpression<Entity>): this {
        throw new Error("Method not implemented.");
    }
    select<SelectType>(expression: {}): Queryable<SelectType> {
        throw new Error("Method not implemented.");
    }
    where(expression: WhereExpression<Entity>): this {
        throw new Error("Method not implemented.");
    }
    groupBy<GroupedType>(expression: {}): GroupedExpressionBuilder<GroupedType, Entity> {
        throw new Error("Method not implemented.");
    }

    orderBy(expression: OrderByExpression<Entity>): this {
        throw new Error("Method not implemented.");
    }
    orderByDescending(expression: OrderByExpression<Entity>): this {
        throw new Error("Method not implemented.");
    }

    take(limit: number): this {
        throw new Error("Method not implemented.");
    }
    skip(amount: number): this {
        throw new Error("Method not implemented.");
    }
    getQuery(): string {
        throw new Error("Method not implemented.");
    }

}