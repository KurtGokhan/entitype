import { QueryRunner } from '../query/QueryRunner';
import { SelectExpression } from '../fluent/types';
import { CommandNode } from '../command/CommandNode';
import { Error } from 'tslint/lib/error';
import { IFiltered, IGrouped, IIncludable, IOrderable, IOrdered, IQueryable } from '../fluent/interfaces/types';
import { DecoratorStorage } from 'src/context/DecoratorStorage';

export class DbSet<EntityType extends Function> implements IQueryable<EntityType> {
  entity: DecoratorStorage.Entity;

  get toList(): { (): Promise<EntityType[]>; query: string; } {
    let cmd = new CommandNode(null, this, this.runCommandChain, this.entity.type);
    return cmd.toList;
  }

  first: { (): Promise<EntityType>; query: string; };
  count: { (): Promise<number>; query: string; };

  constructor(entityType: EntityType) {
    this.entity = DecoratorStorage.getEntity(entityType);
  }

  private runCommandChain(command: CommandNode<EntityType>) {
    let commands = [];
    while (command) {
      commands.push(command);
      command = command.prevNode;
    }

    let runner: QueryRunner = new QueryRunner(commands);
    return runner.run();
  }

  include(): IIncludable<EntityType> {
    throw new Error('Method not implemented.');
  }
  groupBy(): IGrouped<EntityType> {
    throw new Error('Method not implemented.');
  }

  select<SelectType>(expression: SelectExpression<EntityType, SelectType>): IOrderable<SelectType> {
    let cmd = new CommandNode(null, this, this.runCommandChain, this.entity.type);
    cmd.select(expression);
    return <any>cmd;
  }

  orderByAscending(): IOrdered<EntityType> {
    throw new Error('Method not implemented.');
  }
  orderByDescending(): IOrdered<EntityType> {
    throw new Error('Method not implemented.');
  }
  where(): IFiltered<EntityType> {
    throw new Error('Method not implemented.');
  }
}
