export class IMysqlConnectionOptions {
  adapter: string;
  host: string;
  port?: number;
  database: string;
  user: string;
  password: string;
  connectTimeout?: number;
}
