import { ConnectionOptions } from 'entitype';
import { DecoratorStorage } from 'entitype/dist/common/DecoratorStorage';
import { ColumnData, Driver, DriverAdapter, RowData } from 'entitype/dist/plugins';
import { WebSqlConnectionOptions } from 'src';

@Driver('websql')
export class WebSqlDriver implements DriverAdapter {
  async runQuery(query: string, options: string | ConnectionOptions): Promise<[RowData[], ColumnData[]]> {
    if (!window.openDatabase)
      throw new Error('Your browser does not support a stable version of WebSql.');

    if (typeof options !== 'object')
      throw new Error('WebSql options must be an object.');

    let opt = <WebSqlConnectionOptions>options;

    const connection = window.openDatabase(opt.database, opt.version || '1', opt.description, opt.size);


    let txResult = await new Promise<SQLResultSet>((resolveTx, rejectTx) => {
      let result: SQLResultSet;

      connection.transaction((tx) => {
        tx.executeSql(query, [], (_, resultSet) => result = resultSet);
      }, rejectTx, () => resolveTx(result));
    });

    let rows = txResult.rows;
    rows[Symbol.iterator] = (i) => rows.item(i);

    let rowsData = Array.from(rows as any) as RowData[];
    return [rowsData, null];
  }

  async getEntities(options: string | ConnectionOptions): Promise<DecoratorStorage.Entity[]> {
    throw new Error('Schema operations are not supported in Entitype WebSQL plugin.');
  }
}
