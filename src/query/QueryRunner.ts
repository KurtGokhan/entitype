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

export class QueryRunner {
  includes: IncludeCommand[];

  select: SelectCommand;
  isQuery: QueryCommand;
  skip: SkipCommand;
  take: TakeCommand;
  count: CountCommand;
  first: FirstCommand;
  order: OrderByCommand;
  whereGroups: WhereCommand[][];


  joins: { leftEntity: DecoratorStorage.Entity, rightEntity: DecoratorStorage.Entity, lefColumn: string, rightColum: string };

  constructor(private commandChain: Command[]) {
    this.resolveCommands();
  }

  private resolveCommands() {
    this.includes = this.commandChain.filter(x => x.type === CommandType.Include) as IncludeCommand[];

    this.select = this.commandChain.find(x => x.type === CommandType.Select) as SelectCommand;
    this.isQuery = this.commandChain.find(x => x.type === CommandType.Query) as QueryCommand;
    this.take = this.commandChain.find(x => x.type === CommandType.Take) as TakeCommand;
    this.skip = this.commandChain.find(x => x.type === CommandType.Skip) as SkipCommand;
    this.count = this.commandChain.find(x => x.type === CommandType.Count) as CountCommand;
    this.first = this.commandChain.find(x => x.type === CommandType.First) as FirstCommand;
    this.order = this.commandChain.find(x => x.type === CommandType.OrderBy) as OrderByCommand;


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

  protected escapeAlias(alias: string) {
    return '[' + alias + ']';
  }

  private resolveJoins() {

  }

  run(entity: DecoratorStorage.Entity) {

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
    tokens.push(entity.dbName);


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

    if (this.order) {
      tokens.push('ORDER BY');
      tokens.push(<any>this.order.propertyPath);
      tokens.push(this.order.descending ? 'DESC' : 'ASC');
    }


    let query = tokens.filter(x => !!x).join(' ');

    if (this.isQuery)
      return query;
    return this.query(query);
  }

  query(sql: string) {
    return Promise.resolve([]);
  }
}
