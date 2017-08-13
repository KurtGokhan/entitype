import { QueryCommand } from './command-types/QueryCommand';
import { ToListCommand } from './command-types/ToListCommand';
import { CommandType } from './CommandType';
import { SelectCommand } from './command-types/SelectCommand';
import { Command } from './Command';
import { SelectExpressionQuery } from '../fluent/types';
import { IFiltered, IGrouped, IIncludable, IOrderable, IQueryable, IOrdered } from '../fluent/interfaces/types';
import { DbSet } from '../collections/DbSet';
import { SelectExpression } from 'src/fluent/types';
import { DecoratorStorage } from 'src/context/DecoratorStorage';

export class CommandNode<EntityType extends Function> implements IQueryable<EntityType> {
  command: Command;

  get toList(): { (): Promise<EntityType[]>; query: string; } {
    let self = this;
    let ret = () => {
      this.command = new ToListCommand();
      return this.callback(this);
    };

    Object.defineProperty(ret, 'query', {
      get() {
        this.command = new ToListCommand();
        let nextCommand = new CommandNode(self, self.runOn, self.callback, self.entityTypeOrObject);
        nextCommand.command = new QueryCommand();

        return this.callback(nextCommand);
      }
    });

    return ret as any;
  }

  first: { (): Promise<EntityType>; query: string; };
  count: { (): Promise<number>; query: string; };

  constructor(
    public prevNode: CommandNode<EntityType>,
    private runOn: DbSet<EntityType>,
    private callback: (command: CommandNode<any>) => void,
    private entityTypeOrObject: Function | Object) {
  }

  private getColumns(): DecoratorStorage.Column[] {
    if (typeof this.entityTypeOrObject === 'function') {
      let entity = DecoratorStorage.getEntity(this.entityTypeOrObject);
      return entity.columns;
    }
    return null;
  }

  include(): IIncludable<EntityType> {
    throw new Error('Method not implemented.');
  }
  groupBy(): IGrouped<EntityType> {
    throw new Error('Method not implemented.');
  }
  select<SelectType>(expression: SelectExpression<EntityType, SelectType>): IOrderable<SelectType> {
    let parameter: SelectExpressionQuery<EntityType, SelectType> = <any>{};

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

}
