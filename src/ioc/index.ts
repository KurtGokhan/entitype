import { Container } from 'inversify';

import { ConnectionOptions } from '../configuration/ConnectionOptions';
import { QueryContext } from '../query/QueryContext';

export * from './driver-decorator';
export * from './query-builder-decorator';

export const DI_TYPES = {
  driver: Symbol('Driver'),
  logger: Symbol('Logger'),
  queryBuilder: Symbol('QueryBuilder'),
  configuration: Symbol('Configuration')
};

export interface DriverAdapter {
  runQuery(query: string, options: string | ConnectionOptions): Promise<any>;
}

export interface LoggerAdapter {
  log(): void;
}

export interface QueryBuilderAdapter {
  buildQuery(context: QueryContext): string;
}

export const container = new Container();
