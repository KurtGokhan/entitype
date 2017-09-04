import { MysqlConnectionOptions } from './MysqlConnectionOptions';
import { Driver, DriverAdapter, ConnectionOptions } from 'entitype';
import { createConnection } from 'mysql2/promise';

@Driver('mysql2')
export class Mysql2Driver implements DriverAdapter {
  async runQuery(query: string, options: string | ConnectionOptions): Promise<any> {
    const connection = await createConnection(<any>options);

    let result = await connection.query(query);
    return result;
  }
}
