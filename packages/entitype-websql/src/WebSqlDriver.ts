import { ConnectionOptions } from 'entitype';
import { ColumnData, DecoratorStorage, Driver, DriverAdapter, RowData } from 'entitype/dist/plugins';

import { WebSqlConnectionOptions } from './WebSqlConnectionOptions';

@Driver('websql')
export class WebSqlDriver implements DriverAdapter {
  async runQuery(query: string, options: string | ConnectionOptions): Promise<[RowData[], ColumnData[]]> {
    if (!window.openDatabase)
      throw new Error('Your browser does not support a stable version of WebSql.');

    if (typeof options !== 'object')
      throw new Error('WebSql options must be an object.');

    let opt: WebSqlConnectionOptions = options as any;

    const connection = window.openDatabase(opt.database, opt.version || '1', opt.description || '', opt.size);


    let txResult = await new Promise<SQLResultSet>((resolveTx, rejectTx) => {
      let result: SQLResultSet;

      connection.transaction((tx) => {
        tx.executeSql(query, [], (_, resultSet) => result = resultSet);
      },
        rejectTx,
        () => resolveTx(result)
      );
    });

    let rowArray = [];
    let rows = txResult.rows;
    for (let index = 0; index < rows.length; index++) {
      rowArray.push(rows.item(index));
    }

    return [rowArray, null];
  }

  async getEntities(options: string | ConnectionOptions): Promise<DecoratorStorage.Entity[]> {
    throw new Error('Schema operations are not supported in Entitype WebSQL plugin.');
  }
}
