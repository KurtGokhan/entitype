import { decorate, injectable } from 'inversify';

import { DI_TYPES } from './';
import { DriverAdapter } from './';
import { container } from './';

export function Driver(name: string): ClassDecorator {
  return (target) => {
    decorate(injectable(), target);
    container.bind<DriverAdapter>(DI_TYPES.driver).to(<any>target).whenTargetNamed(name);
  };
}
