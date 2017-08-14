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
    let tokens = [];

    let select = this.commandChain.find(x => x.type === CommandType.Select) as SelectCommand;
    let isQuery = this.commandChain.find(x => x.type === CommandType.Query) as QueryCommand;
    let take = this.commandChain.find(x => x.type === CommandType.Take) as TakeCommand;
    let count = this.commandChain.find(x => x.type === CommandType.Count) as CountCommand;
    let first = this.commandChain.find(x => x.type === CommandType.First) as FirstCommand;

    let selectedColumns = select ? select.columns : [];
    let isScalar = selectedColumns.length === 1 && selectedColumns.find(x => !x.alias);

    let columnsQuery = '';
    if (count) columnsQuery = 'COUNT(*)';
    else if (isScalar) columnsQuery = selectedColumns[0].dbName;
    else if (selectedColumns.length) columnsQuery = selectedColumns.map(x => `${x.dbName} as ${x.alias}`).join(', ');
    else columnsQuery = '*';


    let limitQuery = '';
    if (first) limitQuery = 'TOP 1';
    else if (take) limitQuery = 'TOP ' + take.amount;

    tokens.push('SELECT');
    tokens.push(limitQuery);
    tokens.push(columnsQuery);
    tokens.push('FROM');
    tokens.push(entity.dbName);

    let query = tokens.filter(x => !!x).join(' ');

    if (isQuery)
      return query;
    return this.query(query);
  }

  query(sql: string) {
    return Promise.resolve([]);
  }
}
