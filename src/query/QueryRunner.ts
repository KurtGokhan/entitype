import { OrderByCommand } from '../command/command-types/OrderByCommand';
import { WhereCommand } from '../command/command-types/WhereCommand';
import { FirstCommand } from '../command/command-types/FirstCommand';
import { CountCommand } from '../command/command-types/CountCommand';
import { TakeCommand } from '../command/command-types/TakeCommand';
import { QueryCommand } from '../command/command-types/QueryCommand';
import { Command } from '../command/Command';
import { SelectCommand } from '../command/command-types/SelectCommand';
import { CommandType } from '../command/CommandType';
import { CommandNode } from '../command/CommandNode';
import { DecoratorStorage } from 'src/storage/DecoratorStorage';
import { IncludeCommand } from 'src/command/command-types/IncludeCommand';
import { SkipCommand } from 'src/command/command-types/SkipCommand';
import { OrCommand } from 'src/command/command-types/OrCommand';
import { PropertyPath } from 'src/fluent';

export class QueryRunner {
  includes: IncludeCommand[];
  wheres: WhereCommand[];
  orders: OrderByCommand[];

  select: SelectCommand;
  isQuery: QueryCommand;
  skip: SkipCommand;
  take: TakeCommand;
  count: CountCommand;
  first: FirstCommand;
  whereGroups: WhereCommand[][];


  private joins: {
    leftEntity: DecoratorStorage.Entity,
    rightEntity: DecoratorStorage.Entity,
    lefColumn: string,
    rightColum: string
  }[] = [];
  private typeAliases: { type: DecoratorStorage.Entity, alias: string }[] = [];
  private columnAliases: { column: DecoratorStorage.Column, alias: string }[] = [];

  constructor(private commandChain: Command[], private entity: DecoratorStorage.Entity) {
    this.resolveCommands();
  }

  private resolveCommands() {
    this.includes = this.commandChain.filter(x => x.type === CommandType.Include) as IncludeCommand[];
    this.wheres = this.commandChain.filter(x => x.type === CommandType.Where) as WhereCommand[];
    this.orders = this.commandChain.filter(x => x.type === CommandType.OrderBy) as OrderByCommand[];

    this.select = this.commandChain.find(x => x.type === CommandType.Select) as SelectCommand;
    this.isQuery = this.commandChain.find(x => x.type === CommandType.Query) as QueryCommand;
    this.take = this.commandChain.find(x => x.type === CommandType.Take) as TakeCommand;
    this.skip = this.commandChain.find(x => x.type === CommandType.Skip) as SkipCommand;
    this.count = this.commandChain.find(x => x.type === CommandType.Count) as CountCommand;
    this.first = this.commandChain.find(x => x.type === CommandType.First) as FirstCommand;


    this.whereGroups = [[]];
    let currentWhereGroup = this.whereGroups[0];
    let firstWhereIndex = this.commandChain.findIndex(x => x.type === CommandType.Where);
    if (firstWhereIndex >= 0) {
      for (let index = firstWhereIndex; index < this.commandChain.length; index++) {
        let cmd = this.commandChain[index];

        if (cmd.type === CommandType.OrWhere) {
          currentWhereGroup = [];
          this.whereGroups.push(currentWhereGroup);
        }
        else if (cmd.type === CommandType.Where) {
          currentWhereGroup.push(cmd as WhereCommand);
        }
        else break;
      }
    }
  }

  private getColumnInfoForPropertyPath(path: PropertyPath): DecoratorStorage.Column {
    let entity = this.entity;
    let col = null;

    for (let index = 0; index < path.length; index++) {
      let prop = path[index];

      if (!entity) throw Error('Wrong property path in the query');

      col = entity.columns.find(x => x.name === prop);
      entity = DecoratorStorage.getEntity(col.type);
    }
    return col;
  }


  protected escapeAlias(alias: string) {
    return '[' + alias + ']';
  }

  private resolveJoins() {
    let paths = [];
    if (this.select)
      paths.push(...this.select.columns.filter(x => x.path.length > 1));

    paths.push(...this.wheres.filter(x => x.propertyPath.length > 1));
    paths.push(...this.includes.map(x => x.propertyPath));
    paths.push(...this.orders.filter(x => x.propertyPath.length > 1));

  }

  run() {

    let tokens: string[] = [];

    let selectedColumns = this.select ? this.select.columns : [];
    let isScalar = selectedColumns.length === 1 && selectedColumns.find(x => !x.mapPath.length);

    let columnsQuery = '';
    if (this.count) columnsQuery = 'COUNT(*)';
    else if (isScalar) columnsQuery = selectedColumns[0].path.toString();
    else if (selectedColumns.length) columnsQuery = selectedColumns.map(x => `${x.path} as ${x.mapPath}`).join(', ');
    else columnsQuery = '*';


    let limitQuery = '';
    if (this.first) limitQuery = 'TOP 1';
    else if (this.take) limitQuery = 'TOP ' + this.take.amount;

    tokens.push('SELECT');
    tokens.push(limitQuery);
    tokens.push(columnsQuery);
    tokens.push('FROM');
    tokens.push(this.entity.dbName);


    if (this.whereGroups.length && this.whereGroups[0].length) {
      tokens.push('WHERE');

      for (let index = 0; index < this.whereGroups.length; index++) {
        let group = this.whereGroups[index];

        if (index > 0) tokens.push('OR');

        tokens.push('(');
        for (let cmdIndex = 0; cmdIndex < group.length; cmdIndex++) {
          let cmd = group[cmdIndex];

          if (cmdIndex > 0) tokens.push('AND');

          let whereQuery = cmd.propertyPath + cmd.condition;

          tokens.push('(');
          if (cmd.negated) tokens.push('NOT');
          tokens.push(whereQuery);
          tokens.push(')');
        }
        tokens.push(')');
      }
    }

    if (this.orders.length) {
      tokens.push('ORDER BY');

      this.orders.forEach(order => {
        tokens.push(<any>order.propertyPath);
        tokens.push(order.descending ? 'DESC' : 'ASC');
        tokens.push(',');
      });
      tokens.pop();
    }


    let query = tokens.filter(x => !!x).join(' ');

    if (this.isQuery) return query;
    return this.runQuery(query);
  }

  runQuery(sql: string) {
    return Promise.resolve([]);
  }
}
