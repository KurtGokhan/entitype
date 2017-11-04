import { container, DI_TYPES } from '../ioc';

export class ConnectionOptions {
  adapter: string;

  static getConfiguration(name?: string): ConnectionOptions {
    if (name) return container.getNamed(DI_TYPES.configuration, name);
    else return container.get(DI_TYPES.configuration);
  }
}
