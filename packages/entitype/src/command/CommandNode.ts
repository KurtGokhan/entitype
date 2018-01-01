import { InsertCommand, PersistCommand, SetCommand, UpdateCommand } from '../command/command-types';
import { IncludeCommand } from '../command/command-types/IncludeCommand';
import { AndCommand, OrCommand } from '../command/command-types/OrCommand';
import {
    DeepPropertyExpression,
    IFiltered,
    IOrdered,
    ObjectType,
    PropertyExpression,
    PropertyMapExpression,
} from '../fluent';
import { DbSet } from '../fluent';
import { ISetable } from '../fluent/collection';
import { IFilterCondition } from '../fluent/interfaces';
import {
    resolveDeepPropertyExpression,
    resolveDeepPropertyExpressionArray,
    resolvePropertyMapExpression,
} from '../fluent/property-selector';
import { WhereConditionPicker } from '../fluent/where-helpers';
import { Command } from './Command';
import { CountCommand } from './command-types/CountCommand';
import { FirstCommand } from './command-types/FirstCommand';
import { OrderByCommand } from './command-types/OrderByCommand';
import { QueryCommand } from './command-types/QueryCommand';
import { SelectCommand } from './command-types/SelectCommand';
import { SkipCommand } from './command-types/SkipCommand';
import { TakeCommand } from './command-types/TakeCommand';
import { ToListCommand } from './command-types/ToListCommand';


export class CommandNode<EntityType>
  implements DbSet<EntityType>, IFiltered<EntityType>, IOrdered<EntityType>, ISetable<EntityType> {

  get or(): CommandNode<EntityType> {
    let nextCommand = this.createNextCommand(new OrCommand());
    return nextCommand;
  }

  get and(): CommandNode<EntityType> {
    let nextCommand = this.createNextCommand(new AndCommand());
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

  get insert(): { (): Promise<EntityType>; query: string; } {
    return this.finalizerCommand(InsertCommand);
  }

  get update(): { (): Promise<EntityType>; query: string; } {
    return this.finalizerCommand(UpdateCommand);
  }

  get persist(): { (): Promise<EntityType>; query: string; } {
    return this.finalizerCommand(PersistCommand);
  }

  get set(): { (): Promise<void>; query: string; } {
    return this.finalizerCommand(SetCommand);
  }

  private finalizerCommand(commandCreator: typeof Command) {
    let self: CommandNode<any> = this;
    let ret = (...args) => {
      let nextCommand: CommandNode<any> = self.createNextCommand(new commandCreator(...args));
      return nextCommand.runCommandChain();
    };

    Object.defineProperty(ret, 'query', {
      get() {
        let nextCommand = self.createNextCommand(new commandCreator());
        let queryCommand: CommandNode<any> = nextCommand.createNextCommand(new QueryCommand());
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

  include(...expressions: DeepPropertyExpression<any, any>[]): CommandNode<EntityType> {
    let include = new IncludeCommand();
    include.propertyPath = resolveDeepPropertyExpressionArray(expressions);

    return this.createNextCommand(include);
  }

  select<SelectType>(expression: PropertyMapExpression<EntityType, SelectType>): CommandNode<SelectType> {
    let select = new SelectCommand();
    let [columns, mentions] = resolvePropertyMapExpression(expression, this.entityType);
    select.columns = columns;
    select.mentions = mentions;
    select.expression = expression;

    return this.createNextCommand(select);
  }

  orderByAscending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): CommandNode<EntityType> {
    return this.evaluateOrderExpression(expression, false);
  }

  orderByDescending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): CommandNode<EntityType> {
    return this.evaluateOrderExpression(expression, true);
  }


  thenByAscending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): CommandNode<EntityType> {
    return this.orderByAscending(expression);
  }

  thenByDescending<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): CommandNode<EntityType> {
    return this.orderByDescending(expression);
  }

  private evaluateOrderExpression<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>, descending: boolean): CommandNode<EntityType> {
    let cmd = new OrderByCommand();
    cmd.propertyPath = resolveDeepPropertyExpression(expression);
    cmd.descending = descending;

    return this.createNextCommand(cmd);
  }


  where<SelectType>(expression: DeepPropertyExpression<EntityType, SelectType>): IFilterCondition<EntityType, SelectType> {
    let path = resolveDeepPropertyExpression(expression);
    let onFinish = (whereCommand) => this.createNextCommand(whereCommand);

    return new WhereConditionPicker(path, onFinish);
  }


  when<SelectType>(expression: PropertyExpression<EntityType, SelectType>): any {
    return this.where(expression);
  }

  skip(amount: number): CommandNode<EntityType> {
    let skip = new SkipCommand();
    skip.amount = amount;
    return this.createNextCommand(skip);
  }

  take(amount: number): CommandNode<EntityType> {
    let take = new TakeCommand();
    take.amount = amount;
    return this.createNextCommand(take);
  }

  private createNextCommand(command: Command, entityTypeOrObject?: ObjectType<any>): CommandNode<any> {
    return new CommandNode(this, this.callback, entityTypeOrObject || this.entityType, command) as any;
  }

}
