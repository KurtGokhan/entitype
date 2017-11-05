import { decorate, injectable } from 'inversify';

import { QueryContext } from '../query/QueryContext';
import { DI_TYPES } from './';
import { container } from './';

export function QueryBuilder(name: string): ClassDecorator {
  return (target) => {
    decorate(injectable(), target);
    container.bind<QueryBuilderAdapter>(DI_TYPES.queryBuilder).to(<any>target).whenTargetNamed(name);
  };
}

export interface QueryBuilderAdapter {
  buildQuery(context: QueryContext): string;
}
