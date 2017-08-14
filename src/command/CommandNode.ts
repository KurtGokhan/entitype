import { QueryCommand } from './command-types/QueryCommand';
import { ToListCommand } from './command-types/ToListCommand';
import { CommandType } from './CommandType';
import { SelectCommand } from './command-types/SelectCommand';
import { Command } from './Command';
import { SelectExpressionQuery } from '../fluent/types';
import {
  IExecutable,
  IFiltered,
  IGrouped,
  IIncludable,
  IOrderable,
  IOrdered,
  IQueryable,
  ITakeable,
} from '../fluent/interfaces/types';
import { DbSet } from '../collections/DbSet';
import { SelectExpression } from 'src/fluent/types';
import { DecoratorStorage } from 'src/context/DecoratorStorage';

export class CommandNode<EntityType> implements IQueryable<EntityType> {

  command: Command;

  get toList(): { (): Promise<EntityType[]>; query: string; } {
    let self = this;
    let ret = () => {
      this.command = new ToListCommand();
      return this.runCommandChain();
    };

    Object.defineProperty(ret, 'query', {
      get() {
        self.command = new ToListCommand();
        let nextCommand = new CommandNode(self, self.runOn, self.callback, self.entityTypeOrObject);
        nextCommand.command = new QueryCommand();

        return nextCommand.runCommandChain();
      }
    });

    return ret as any;
  }

  first: { (): Promise<EntityType>; query: string; };
  count: { (): Promise<number>; query: string; };

  constructor(
    public prevNode: CommandNode<EntityType>,
    private runOn: DbSet<EntityType>,
    private callback: (commands: Command[]) => void,
    private entityTypeOrObject: Function | Object) {
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
    sel.columns = [];

    for (let key in selectObject) {
      if (selectObject.hasOwnProperty(key)) {
        let prop = selectObject[key];

        sel.columns.push({ alias: key, dbName: prop as any });
      }
    }

    this.command = sel;

    return <any>new CommandNode(this, this.runOn, this.callback, selectObject);
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

  skip(amount: number): ITakeable<EntityType> {
    throw new Error('Method not im.plemented.');
  }

  take(amount: number): IExecutable<EntityType> {
    throw new Error('Method not implemented.');
  }
}
