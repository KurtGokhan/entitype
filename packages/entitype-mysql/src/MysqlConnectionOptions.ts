import { ConnectionOptions as EntitypeConnectionOptions } from 'entitype';
import { ConnectionOptions } from 'mysql2';

import { IMysqlConnectionOptions } from './IMysqlConnectionOptions';

export class MysqlConnectionOptions extends EntitypeConnectionOptions implements IMysqlConnectionOptions {
  database: string;
  host: string;
  port?: number;
  user: string;
  password: string;

  connectTimeout: number;

  public constructor(init?: Partial<MysqlConnectionOptions>) {
    super();
    Object.assign(this, init);
  }

  static from(init?: ConnectionOptions) {
    if (!init) return null;
    return new MysqlConnectionOptions({
      database: init.database,
      host: init.host,
      user: init.user,
      password: init.password,
      port: init.port,
      connectTimeout: init.connectTimeout
    });
  }

  toMysqlOptions(): ConnectionOptions {
    return this;
  }
}
