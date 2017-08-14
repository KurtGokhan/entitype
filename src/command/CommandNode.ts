import { createWhereExpressionQueryBase } from './helpers/where-helpers';
import { getColumns } from './helpers/column-helpers';
import { WhereExpressionQuery } from '../fluent';
import { CountCommand } from './command-types/CountCommand';
import { FirstCommand } from './command-types/FirstCommand';
import { SkipCommand } from './command-types/SkipCommand';
import { TakeCommand } from './command-types/TakeCommand';
import { QueryCommand } from './command-types/QueryCommand';
import { ToListCommand } from './command-types/ToListCommand';
import { CommandType } from './CommandType';
import { SelectCommand } from './command-types/SelectCommand';
import { Command } from './Command';
import { SelectExpressionQuery } from '../fluent';
import {
  IListable,
  IFiltered,
  IGrouped,
  IIncludable,
  IOrderable,
  IOrdered,
  IQueryable,
  ITakeable,
} from '../fluent/interfaces';
import { DbSet } from '../collections/DbSet';
import { SelectExpression, WhereExpression } from 'src/fluent';
import { DecoratorStorage } from 'src/context/DecoratorStorage';
import { WhereCommand } from 'src/command/command-types/WhereCommand';

export class CommandNode<EntityType> implements IQueryable<EntityType> {

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
    private entityTypeOrObject: Function | Object,
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
  select<SelectType>(expression: SelectExpression<EntityType, SelectType>): IOrderable<SelectType> {
    let parameter: SelectExpressionQuery<EntityType, EntityType> = <any>{};

    let columns = getColumns(this.entityTypeOrObject);
    for (let index = 0; index < columns.length; index++) {
      let column = columns[index];

      parameter[column.name] = <any>column.dbName;
    }

    let selectObject = expression(parameter);

    let select = new SelectCommand();

    if (typeof selectObject === 'string') {
      select.columns = [{ alias: '', dbName: selectObject }];
    }
    else {
      // TODO: deep selection

      select.columns = [];

      for (let key in selectObject) {
        if (selectObject.hasOwnProperty(key)) {
          let prop = selectObject[key];

          select.columns.push({ alias: key, dbName: prop as any });
        }
      }
    }

    return this.createNextCommand(select, selectObject);
  }
  orderByAscending(): IOrdered<EntityType> {
    throw new Error('Method not implemented.');
  }
  orderByDescending(): IOrdered<EntityType> {
    throw new Error('Method not implemented.');
  }

  where(expression: WhereExpression<EntityType>): IFiltered<EntityType> {
    let parameter = createWhereExpressionQueryBase<EntityType>(this.entityTypeOrObject);
    let whereCommand = expression(parameter);


    return this.createNextCommand(whereCommand);
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

  private createNextCommand(command: Command, entityTypeOrObject?: Function | Object) {
    return <any>new CommandNode(this, this.callback, entityTypeOrObject || this.entityTypeOrObject, command);
  }
}
