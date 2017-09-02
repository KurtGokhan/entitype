import { ADAPTER_TYPES } from './';
import { DriverAdapter } from './';
import { container } from './';
import { injectable } from 'inversify';

export function Driver(name: string): ClassDecorator {
  return (target) => {
    injectable()(target);
    container.bind<DriverAdapter>(ADAPTER_TYPES.driver).to(<any>target).whenTargetNamed(name);
  };
}
