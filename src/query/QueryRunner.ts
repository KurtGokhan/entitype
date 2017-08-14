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
    let select = this.commandChain.find(x => x.type === CommandType.Select) as SelectCommand;
    let isQuery = this.commandChain.find(x => x.type === CommandType.Query) as QueryCommand;
    let limit = this.commandChain.find(x => x.type === CommandType.Take) as TakeCommand;

    let columns = select ? select.columns : [];

    let columnsQuery = columns.map(x => `${x.dbName} as ${x.alias}`).join(', ') || '*';

    let query = 'Select ' + columnsQuery + ' from ' + entity.dbName;

    if (isQuery)
      return query;
    return this.query(query);
  }

  query(sql: string) {
    return Promise.resolve([]);
  }
}
