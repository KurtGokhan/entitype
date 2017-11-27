import { Container } from 'inversify';

export * from './driver';
export * from './query-builder';

export const DI_TYPES = {
  driver: Symbol('Driver'),
  logger: Symbol('Logger'),
  queryBuilder: Symbol('QueryBuilder'),
  configuration: Symbol('Configuration')
};

export type RowData = { [column: string]: any };
export type ColumnData = any;

export const container = new Container();
