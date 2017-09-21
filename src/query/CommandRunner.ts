import { Command } from '../command/Command';
import { QueryCommand } from '../command/command-types/QueryCommand';
import { CommandType } from '../command/CommandType';
import { ConnectionOptions } from '../configuration';
import { container, DI_TYPES, DriverAdapter, QueryBuilderAdapter } from '../ioc';
import { QueryBuilder } from '../query/QueryBuilder';
import { DecoratorStorage } from '../storage/DecoratorStorage';
import { QueryContext } from './QueryContext';
import { ResultMapper } from './ResultMapper';

export class CommandRunner {
  private isQuery: QueryCommand;
  private driver: DriverAdapter;
  private builder: QueryBuilderAdapter;
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

    if (container.isBoundNamed(DI_TYPES.queryBuilder, this.config.adapter))
      this.builder = container.getNamed(DI_TYPES.queryBuilder, this.config.adapter);
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
