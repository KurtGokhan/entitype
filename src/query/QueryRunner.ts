import { QueryBuilder } from 'src/query/QueryBuilder';
import { Command } from 'src/command/Command';
import { QueryCommand } from 'src/command/command-types/QueryCommand';
import { DecoratorStorage } from 'src/storage/DecoratorStorage';
import { CommandType } from 'src/command/CommandType';

export class QueryRunner {
  private isQuery: QueryCommand;

  constructor(private commandChain: Command[], private entity: DecoratorStorage.Entity) {
    this.resolveCommands();
  }

  private resolveCommands() {
    this.isQuery = this.commandChain.find(x => x.type === CommandType.Query) as QueryCommand;
  }

  /**
   * Run the commands and get the result
   *
   * @returns
   * @memberof QueryRunner
   */
  run() {
    let query = new QueryBuilder(this.commandChain, this.entity).build();
    if (this.isQuery) return query;
    return this.runQuery(query);
  }


  /**
   * Run a SQL string against the database
   *
   * @param {string} sql
   * @returns
   * @memberof QueryRunner
   */
  runQuery(sql: string) {
    return Promise.resolve([]);
  }
}
