import { decorate, injectable } from 'inversify';

import { DI_TYPES } from './';
import { container } from './';

export function TypeResolver(name: string): ClassDecorator {
  return (target) => {
    decorate(injectable(), target);
    container.bind<TypeResolverAdapter>(DI_TYPES.typeResolver).to(<any>target).whenTargetNamed(name);
  };
}

export interface TypeResolverAdapter {
  dbTypeToStandartType(dbType: string): [string, any[]];
  standartTypeToDbType(standartType, ...parameters: any[]): string;
}
