import { Command } from '../command/Command';
import { QueryRunner } from '../query/QueryRunner';
import { SelectExpression, WhereExpression } from '../fluent';
import { CommandNode } from '../command/CommandNode';
import { Error } from 'tslint/lib/error';
import { IListable, IFiltered, IGrouped, IIncludable, IOrderable, IOrdered, IQueryable, ITakeable } from '../fluent/interfaces';
import { DecoratorStorage } from 'src/context/DecoratorStorage';

export type ObjectType<T> = { new(): T } | Function;

export class DbSet<EntityType> implements IQueryable<EntityType> {


  entity: DecoratorStorage.Entity;
  rootCommand: CommandNode<EntityType>;

  get toList(): { (): Promise<EntityType[]>; query: string; } {
    return this.rootCommand.toList;
  }

  get first(): { (): Promise<EntityType>; query: string; } {
    return this.rootCommand.first;
  }

  get count(): { (): Promise<number>; query: string; } {
    return this.rootCommand.count;
  }

  constructor(entityType: { new(): EntityType }) {
    this.entity = DecoratorStorage.getEntity(entityType);
    this.rootCommand = new CommandNode(null, this.runCommandChain.bind(this), this.entity.type);
  }

  private runCommandChain(commands: Command[]) {
    let runner: QueryRunner = new QueryRunner(commands);
    return runner.run(this.entity);
  }

  include(): IIncludable<EntityType> {
    return this.rootCommand.include();
  }
  groupBy(): IGrouped<EntityType> {
    return this.rootCommand.groupBy();
  }

  select<SelectType>(expression: SelectExpression<EntityType, SelectType>): IOrderable<SelectType> {
    return this.rootCommand.select(expression);
  }

  orderByAscending(): IOrdered<EntityType> {
    return this.rootCommand.orderByAscending();
  }
  orderByDescending(): IOrdered<EntityType> {
    return this.rootCommand.orderByDescending();
  }
  where(expression: WhereExpression<EntityType>): IFiltered<EntityType> {
    return this.rootCommand.where(expression);
  }

  take(amount: number): IListable<EntityType> {
    return this.rootCommand.take(amount);
  }

  skip(amount: number): ITakeable<EntityType> {
    return this.rootCommand.skip(amount);
  }
}
