import { injectable } from 'inversify';

import { QueryBuilderAdapter } from './';
import { DI_TYPES } from './';
import { container } from './';

export function QueryBuilder(name: string): ClassDecorator {
  return (target) => {
    injectable()(target);
    container.bind<QueryBuilderAdapter>(DI_TYPES.queryBuilder).to(<any>target).whenTargetNamed(name);
  };
}
