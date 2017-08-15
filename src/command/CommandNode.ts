import { PropertyPath } from '../fluent';
import { DeepPropertyExpression } from '../fluent';
import { ObjectType } from '../fluent';
import {
  resolveDeepPropertyExpression,
  resolvePropertyMapExpression,
} from '../fluent/property-selector';
import { OrderByCommand } from './command-types/OrderByCommand';
import { IFilteredFilterable } from '../fluent/interfaces';
import { createWhereExpressionQueryBase } from './helpers/where-helpers';
import { getColumns } from './helpers/column-helpers';
import { WhereSelector } from '../fluent';
import { CountCommand } from './command-types/CountCommand';
import { FirstCommand } from './command-types/FirstCommand';
import { SkipCommand } from './command-types/SkipCommand';
import { TakeCommand } from './command-types/TakeCommand';
import { QueryCommand } from './command-types/QueryCommand';
import { ToListCommand } from './command-types/ToListCommand';
import { CommandType } from './CommandType';
import { SelectCommand } from './command-types/SelectCommand';
import { Command } from './Command';
import {
  IListable,
  IFiltered,
  IGrouped,
  IIncludable,
  IOrderable,
  IOrdered,
  IQueryable,
  ITakeable,
  IWhereable,
} from '../fluent/interfaces';
import { DbSet } from '../collections/DbSet';
import { PropertyMapExpression, WhereExpression } from 'src/fluent';
import { DecoratorStorage } from 'src/context/DecoratorStorage';
import { WhereCommand } from 'src/command/command-types/WhereCommand';
import { OrCommand } from 'src/command/command-types/OrCommand';

export class CommandNode<EntityType> implements IQueryable<EntityType>, IFilteredFilterable<EntityType>, IOrdered<EntityType> {
  get or(): IWhereable<EntityType> {
    let nextCommand = this.createNextCommand(new OrCommand());
    return nextCommand;
  }

  readonly command: Command;

  get toList(): { (): Promise<EntityType[]>; query: string; } {
    return this.finalizerCommand(ToListCommand);
  }

  get first(): { (): Promise<EntityType>; query: string; } {
    return this.finalizerCommand(FirstCommand);
  }

  get count(): { (): Promise<number>; query: string; } {
    return this.finalizerCommand(CountCommand);
  }


  private finalizerCommand(commandCreator: typeof Command) {
    let self = this;
    let ret = () => {
      let nextCommand = self.createNextCommand(new commandCreator());
      return nextCommand.runCommandChain();
    };

    Object.defineProperty(ret, 'query', {
      get() {
        let nextCommand = self.createNextCommand(new commandCreator());
        let queryCommand = nextCommand.createNextCommand(new QueryCommand());
        return queryCommand.runCommandChain();
      }
    });

    return ret as any;
  }

  constructor(
    public prevNode: CommandNode<EntityType>,
    private callback: (commands: Command[]) => void,
    private entityType: ObjectType<EntityType>,
    command?: Command) {
    this.command = command || new Command();
  }

  private runCommandChain() {
    let commands: CommandNode<EntityType>[] = [];
    let command: CommandNode<EntityType> = this;
    while (command) {
      commands.push(command);
      command = command.prevNode;
    }

    return this.callback(commands.map(x => x.command).reverse());
  }

  include(): IIncludable<EntityType> {
    throw new Error('Method not implemented.');
  }
  groupBy(): IGrouped<EntityType> {
    throw new Error('Method not implemented.');
  }
  select<SelectType>(expression: PropertyMapExpression<EntityType, SelectType>): IOrderable<SelectType> {
    let select = new SelectCommand();
    select.columns = resolvePropertyMapExpression(expression, this.entityType);

    return this.createNextCommand(select);
  }

  orderByAscending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType> {
    return this.evaluateOrderExpression(expression, false);
  }

  orderByDescending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType> {
    return this.evaluateOrderExpression(expression, true);
  }


  thenByAscending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType> {
    return this.orderByAscending(expression);
  }

  thenByDescending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IOrdered<EntityType> {
    return this.orderByDescending(expression);
  }

  private evaluateOrderExpression<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>, descending: boolean) {
    let cmd = new OrderByCommand();
    cmd.propertyPath = resolveDeepPropertyExpression(expression, this.entityType);
    cmd.descending = descending;

    return this.createNextCommand(cmd);
  }


  where(expression: WhereExpression<EntityType>): IFiltered<EntityType> {
    let parameter = createWhereExpressionQueryBase<EntityType>(this.entityType);
    let whereCommand = expression(parameter);

    return this.createNextCommand(whereCommand);
  }

  andWhere(expression: WhereExpression<EntityType>): IFilteredFilterable<EntityType> {
    return this.where(expression);
  }

  skip(amount: number): ITakeable<EntityType> {
    let skip = new SkipCommand();
    skip.amount = amount;
    return this.createNextCommand(skip);
  }

  take(amount: number): IListable<EntityType> {
    let take = new TakeCommand();
    take.amount = amount;
    return this.createNextCommand(take);
  }

  private createNextCommand(command: Command, entityTypeOrObject?: ObjectType<any>) {
    return <any>new CommandNode(this, this.callback, entityTypeOrObject || this.entityType, command);
  }

}
