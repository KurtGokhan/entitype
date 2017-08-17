import { DecoratorStorage } from 'src/storage/DecoratorStorage';
import { Command } from '../command/Command';
import { CommandNode } from '../command/CommandNode';
import {
  DeepPropertyExpression,
  IFiltered,
  IGrouped,
  IIncludable,
  IListable,
  IOrderable,
  IOrdered,
  IQueryable,
  ITakeable,
  ObjectType,
  PropertyMapExpression,
  WhereExpression,
} from '../fluent';
import { QueryRunner } from '../query/QueryRunner';

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

  constructor(entityType: ObjectType<EntityType>) {
    this.entity = DecoratorStorage.getEntity(entityType);
    this.rootCommand = new CommandNode(null, this.runCommandChain.bind(this), this.entity.type as any);
  }

  private runCommandChain(commands: Command[]) {
    let runner: QueryRunner = new QueryRunner(commands, this.entity);
    return runner.run();
  }

  include(): IIncludable<EntityType> {
    return this.rootCommand.include();
  }
  groupBy(): IGrouped<EntityType> {
    return this.rootCommand.groupBy();
  }

  select<SelectType>(expression: PropertyMapExpression<EntityType, SelectType>): IOrderable<SelectType> {
    return this.rootCommand.select(expression);
  }

  orderByAscending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType> {
    return this.rootCommand.orderByAscending(expression);
  }
  orderByDescending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType> {
    return this.rootCommand.orderByDescending(expression);
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
