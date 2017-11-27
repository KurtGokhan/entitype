import { decorate, injectable } from 'inversify';

import { DI_TYPES } from './';
import { container } from './';

export function Logger(name: string): ClassDecorator {
  return (target) => {
    decorate(injectable(), target);
    container.bind<LoggerAdapter>(DI_TYPES.logger).to(<any>target).whenTargetNamed(name);
  };
}

export interface LoggerAdapter {
  log(): void;
}
