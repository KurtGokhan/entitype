import { ConnectionOptions } from '../configuration/ConnectionOptions';

export abstract class EntitypeContext {
  readonly connectionOptions: ConnectionOptions;

  constructor();
  constructor(connectionConfigName: string);
  constructor(connectionOptions: ConnectionOptions);

  constructor(configOrName: string | ConnectionOptions = 'default') {
    if (typeof configOrName === 'string') {
      this.connectionOptions = ConnectionOptions.getByName(configOrName);
    }
    else {
      this.connectionOptions = configOrName;
    }
  }
}
