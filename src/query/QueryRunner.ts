import { SelectCommand } from '../command/command-types/SelectCommand';
import { CommandType } from '../command/CommandType';
import { CommandNode } from '../command/CommandNode';
export class QueryRunner {


  constructor(private commandChain: CommandNode<any>[]) {
  }

  run() {
    let select = this.commandChain.find(x => x.command.type === CommandType.Select).command as SelectCommand;
    let columns = select ? select.columns : [];

    let columnsQuery = columns.map(x => `${x.dbName} as ${x.alias}`).join(', ') || '*';

    let selectQueryPart = 'Select ' + columnsQuery + ' from ';
  }
}
