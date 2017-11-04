import { container, DI_TYPES } from '../ioc';
import { ConnectionOptions } from './ConnectionOptions';
export * from './ConnectionOptions';

export function useConfiguration(configuration: ConnectionOptions, name?: string) {
  if (!name) {
    if (container.isBound(DI_TYPES.configuration))
      container.rebind(DI_TYPES.configuration).toConstantValue(configuration).whenTargetIsDefault();
    else
      container.bind(DI_TYPES.configuration).toConstantValue(configuration).whenTargetIsDefault();
  }
  else {
    if (container.isBoundNamed(DI_TYPES.configuration, name))
      container.rebind(DI_TYPES.configuration).toConstantValue(configuration).whenTargetNamed(name);
    else
      container.bind(DI_TYPES.configuration).toConstantValue(configuration).whenTargetNamed(name);
  }
}
