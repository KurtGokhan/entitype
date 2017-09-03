import { QueryContext } from './QueryContext';
import { ResultMapper } from './ResultMapper';
import { DriverAdapter, DI_TYPES, container } from '../ioc';
import { QueryBuilder } from '../query/QueryBuilder';
import { Command } from '../command/Command';
import { QueryCommand } from '../command/command-types/QueryCommand';
import { DecoratorStorage } from '../storage/DecoratorStorage';
import { CommandType } from '../command/CommandType';
import { ConnectionOptions } from '../configuration';

export class CommandRunner {
  private isQuery: QueryCommand;
  private driver: DriverAdapter;
  private context: QueryContext;

  constructor(
    private commandChain: Command[],
    private entity: DecoratorStorage.Entity,
    private config: ConnectionOptions) {

    if (this.config) this.resolveDependencies();
    this.resolveCommands();
    this.context = new QueryContext(this.commandChain, this.entity);
  }

  private resolveDependencies() {
    if (container.isBoundNamed(DI_TYPES.driver, this.config.adapter))
      this.driver = container.getNamed(DI_TYPES.driver, this.config.adapter);
  }

  private resolveCommands() {
    this.isQuery = this.commandChain.find(x => x.type === CommandType.Query) as QueryCommand;
  }

  /**
   * Run the commands and get the result
   */
  run() {
    let query = new QueryBuilder(this.context).build();
    if (this.isQuery) return query;
    let queryResult = this.runQuery(query);
    return new ResultMapper(this.context).mapResult(queryResult as any);
  }


  /**
   * Run a SQL string against the database
   *
   * @param {string} sql
   * @returns
   * @memberof QueryRunner
   */
  runQuery(sql: string) {
    return this.driver.runQuery(sql, this.config);
  }
}
