import { ConnectionOptions } from 'entitype';

import { IWebSqlConnectionOptions } from './IWebSqlConnectionOptions';

export class WebSqlConnectionOptions extends ConnectionOptions implements IWebSqlConnectionOptions {
  database: string;
  version: string;
  description: string;
  size: number;

  public constructor(init?: Partial<WebSqlConnectionOptions>) {
    super();
    Object.assign(this, init);
  }
}
