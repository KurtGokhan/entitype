import { MysqlConnectionOptions } from 'entitype-mysql';
export interface IPullOptions {
  output?: string;
  interactive?: boolean;
  index?: boolean;
  connection: MysqlConnectionOptions;
}
