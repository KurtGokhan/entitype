import { Container } from 'inversify';
export * from './driver-decorator';

export const ADAPTER_TYPES = {
  driver: Symbol('Driver'),
  logger: Symbol('Logger'),
  queryBuilder: Symbol('QueryBuilder')
};

export interface DriverAdapter {
  runQuery(query: string): Promise<any>;
}

export interface LoggerAdapter {
  log(): void;
}

export interface QueryBuilderAdapter {
  buildQuery(): string;
}

export const container = new Container();
