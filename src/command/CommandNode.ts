import { SkipCommand } from './command-types/SkipCommand';
import { TakeCommand } from './command-types/TakeCommand';
import { QueryCommand } from './command-types/QueryCommand';
import { ToListCommand } from './command-types/ToListCommand';
import { CommandType } from './CommandType';
import { SelectCommand } from './command-types/SelectCommand';
import { Command } from './Command';
import { SelectExpressionQuery } from '../fluent';
import {
  IExecutable,
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

export class CommandNode<EntityType> implements IQueryable<EntityType> {

  readonly command: Command;

  get toList(): { (): Promise<EntityType[]>; query: string; } {
    let self = this;
    let ret = () => {
      let nextCommand = new CommandNode(self, self.callback, self.entityTypeOrObject, new ToListCommand());
      return nextCommand.runCommandChain();
    };

    Object.defineProperty(ret, 'query', {
      get() {
        let nextCommand = new CommandNode(self, self.callback, self.entityTypeOrObject, new ToListCommand());
        let queryCommand = new CommandNode(nextCommand, self.callback, self.entityTypeOrObject, new QueryCommand());
        return queryCommand.runCommandChain();
      }
    });

    return ret as any;
  }

  first: { (): Promise<EntityType>; query: string; };
  count: { (): Promise<number>; query: string; };

  constructor(
    public prevNode: CommandNode<EntityType>,
    private callback: (commands: Command[]) => void,
    private entityTypeOrObject: Function | Object,
    command?: Command) {
    this.command = command || new Command();
  }

  private getColumns(): DecoratorStorage.Column[] {
    if (typeof this.entityTypeOrObject === 'function') {
      let entity = DecoratorStorage.getEntity(this.entityTypeOrObject);
      return entity.columns;
    }
    return null;
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

    let columns = this.getColumns();
    for (let index = 0; index < columns.length; index++) {
      let column = columns[index];

      parameter[column.name] = <any>column.dbName;
    }

    let selectObject = expression(parameter);

    let sel = new SelectCommand();

    if (typeof selectObject === 'string') {
      sel.columns = [{ alias: '', dbName: selectObject }];
    }
    else {
      // TODO: deep selection

      sel.columns = [];

      for (let key in selectObject) {
        if (selectObject.hasOwnProperty(key)) {
          let prop = selectObject[key];

          sel.columns.push({ alias: key, dbName: prop as any });
        }
      }
    }

    return <any>new CommandNode(this, this.callback, selectObject, sel);
  }
  orderByAscending(): IOrdered<EntityType> {
    throw new Error('Method not implemented.');
  }
  orderByDescending(): IOrdered<EntityType> {
    throw new Error('Method not implemented.');
  }

  where(expression: WhereExpression<EntityType>): IFiltered<EntityType> {
    throw new Error('Method not implemented.');
  }

  skip(amount: number): ITakeable<EntityType> {
    let skip = new SkipCommand();
    skip.amount = amount;
    return <any>new CommandNode(this, this.callback, this.entityTypeOrObject, skip);
  }

  take(amount: number): IExecutable<EntityType> {
    let take = new TakeCommand();
    take.amount = amount;
    return <any>new CommandNode(this, this.callback, this.entityTypeOrObject, take);
  }
}
