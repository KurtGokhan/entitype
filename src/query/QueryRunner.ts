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
import { DecoratorStorage } from 'src/context/DecoratorStorage';

export class QueryRunner {


  constructor(private commandChain: Command[]) {
  }

  run(entity: DecoratorStorage.Entity) {
    let tokens: string[] = [];

    let select = this.commandChain.find(x => x.type === CommandType.Select) as SelectCommand;
    let isQuery = this.commandChain.find(x => x.type === CommandType.Query) as QueryCommand;
    let take = this.commandChain.find(x => x.type === CommandType.Take) as TakeCommand;
    let count = this.commandChain.find(x => x.type === CommandType.Count) as CountCommand;
    let first = this.commandChain.find(x => x.type === CommandType.First) as FirstCommand;
    let order = this.commandChain.find(x => x.type === CommandType.OrderBy) as OrderByCommand;

    let selectedColumns = select ? select.columns : [];
    let isScalar = selectedColumns.length === 1 && selectedColumns.find(x => !x.mapPath.length);

    let columnsQuery = '';
    if (count) columnsQuery = 'COUNT(*)';
    else if (isScalar) columnsQuery = selectedColumns[0].path.toString();
    else if (selectedColumns.length) columnsQuery = selectedColumns.map(x => `${x.path} as ${x.mapPath}`).join(', ');
    else columnsQuery = '*';


    let limitQuery = '';
    if (first) limitQuery = 'TOP 1';
    else if (take) limitQuery = 'TOP ' + take.amount;

    tokens.push('SELECT');
    tokens.push(limitQuery);
    tokens.push(columnsQuery);
    tokens.push('FROM');
    tokens.push(entity.dbName);


    let whereStart;
    let whereEnd;


    let wheres = this.commandChain.filter(x => x.type === CommandType.Where || x.type === CommandType.OrWhere);
    if (wheres.length) {
      tokens.push('WHERE');
      tokens.push('(');

      let andRequired = false;
      for (let index = 0; index < wheres.length; index++) {
        let cmd = wheres[index] as WhereCommand;

        if (cmd.type === CommandType.OrWhere) {
          tokens.push(')');
          tokens.push('OR');
          tokens.push('(');

          andRequired = false;
          continue;
        }

        if (andRequired) {
          tokens.push('AND');
        }

        tokens.push('(');
        if (cmd.negated) tokens.push('NOT');
        let whereQuery = cmd.propertyPath + cmd.condition;
        tokens.push(whereQuery);
        tokens.push(')');

        andRequired = true;
      }

      tokens.push(')');
    }

    if (order) {
      tokens.push('ORDER BY');
      tokens.push(<any>order.propertyPath);
      tokens.push(order.descending ? 'DESC' : 'ASC');
    }


    let query = tokens.filter(x => !!x).join(' ');

    if (isQuery)
      return query;
    return this.query(query);
  }

  query(sql: string) {
    return Promise.resolve([]);
  }
}
