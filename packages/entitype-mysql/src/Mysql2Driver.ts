import { ConnectionOptions } from 'entitype';
import { Driver, DriverAdapter, RowData, ColumnData } from 'entitype/dist/plugins';
import { createConnection } from 'mysql2/promise';
import { RowDataPacket } from 'mysql';

@Driver('mysql2')
export class Mysql2Driver implements DriverAdapter {
  async runQuery(query: string, options: string | ConnectionOptions): Promise<[RowData[], ColumnData[]]> {
    const connection = await createConnection(<any>options);

    let [rows, columns] = await connection.query(query);
    let rowsData = rows as RowData[];
    return [rowsData, columns];
  }
}
