export class MysqlConnectionOptions {
  adapter: 'mysql';
  host: string;
  port?: number;
  database: string;
  user: string;
  password: string;
  connectTimeout?: number;
}
