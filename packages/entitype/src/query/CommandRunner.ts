import { Command } from '../command/Command';
import { QueryCommand } from '../command/command-types/QueryCommand';
import { CommandType } from '../command/CommandType';
import { DecoratorStorage } from '../common/DecoratorStorage';
import { ConnectionOptions } from '../configuration';
import { container, DI_TYPES, DriverAdapter, QueryBuilderAdapter } from '../ioc';
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

    let adapterName = this.config.adapter;
    if (container.isBoundNamed(DI_TYPES.queryBuilder, adapterName))
      this.builder = container.getNamed(DI_TYPES.queryBuilder, adapterName);
    else
      throw Error(`
      Could not find a Query Builder that matches the name '${adapterName}'.
      Did you forget to add the plugin?
      `);
  }

  private resolveCommands() {
    this.isQuery = this.commandChain.find(x => x.type === CommandType.Query) as QueryCommand;
  }

  /**
   * Run the commands and get the result
   */
  run() {
    let query = this.buildQuery();
    if (this.isQuery) return query;
    let queryPromise = this.runQuery(query);

    return queryPromise.then(queryResult => new ResultMapper(this.context).mapResult(queryResult[0]));
  }

  private buildQuery() {
    return this.builder.buildQuery(this.context);
  }

  private runQuery(sql: string) {
    return this.driver.runQuery(sql, this.config);
  }
}
