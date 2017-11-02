import { ConnectionOptions, DefaultColumnOptions } from 'entitype';
import { DecoratorStorage } from 'entitype/dist/common/DecoratorStorage';
import { ColumnData, Driver, DriverAdapter, RowData } from 'entitype/dist/plugins';
import { createConnection } from 'mysql2/promise';

export type ColumnMetadata = {
  Field: string,
  Type: string,
  Null: string,
  Key: string,
  Default: any,
  Extra: string
};

export type ForeignKeyMetadata = {
  TABLE_NAME: string,
  COLUMN_NAME: string,
  CONSTRAINT_NAME: string,
  REFERENCED_TABLE_NAME: string,
  REFERENCED_COLUMN_NAME: string
};

@Driver('mysql')
export class MysqlDriver implements DriverAdapter {
  async runQuery(query: string, options: string | ConnectionOptions): Promise<[RowData[], ColumnData[]]> {
    const connection = await createConnection(<any>options);

    try {
      let [rows, columns] = await connection.query(query);
      let rowsData = rows as RowData[];
      return [rowsData, columns];
    }
    finally {
      await connection.end();
    }
  }

  async getEntities(options: string | ConnectionOptions): Promise<DecoratorStorage.Entity[]> {
    let tables = await this.getTables(options);
    let entities = tables.map(table => new DecoratorStorage.Entity({
      dbName: table,
      name: table,
      options: { tableName: table }
    }));

    for (let index = 0; index < entities.length; index++) {
      let entity = entities[index];
      entity.columns = await this.getTableColumns(entity.dbName, options);
      entity.columns.forEach(col => col.parent = entity);
    }


    for (let index = 0; index < entities.length; index++) {
      let entity = entities[index];
      let fks = await this.getTableForeignKeys(entity.dbName, options);

      fks.forEach(fk => {
        let col = entity.columns.find(x => x.dbName === fk.COLUMN_NAME);
        if (!col) return;
        col.isForeignKey = true;

        let foreignKey = {
          owner: entity.dbName as any,
          column: fk.COLUMN_NAME
        };

        let navigationProperty = new DecoratorStorage.Column({
          isColumn: false,
          isForeignKey: false,
          isNavigationProperty: true,
          foreignKey,
          name: fk.COLUMN_NAME + '_np',
          parent: entity,
          options: Object.assign({}, DefaultColumnOptions)
        });
        entity.columns.push(navigationProperty);


        let counterEntity = entities.find(x => x.dbName === fk.REFERENCED_TABLE_NAME);

        let counterNavigationProperty = new DecoratorStorage.Column({
          isColumn: false,
          isForeignKey: false,
          isNavigationProperty: true,
          foreignKey,
          name: fk.TABLE_NAME + '_np',
          parent: counterEntity,
          options: Object.assign({}, DefaultColumnOptions)
        });
        counterEntity.columns.push(counterNavigationProperty);
      });
    }

    return entities;
  }

  private async getTables(options: string | ConnectionOptions): Promise<string[]> {
    let query = 'SHOW TABLES';
    let [rows] = await this.runQuery(query, options);

    let key = rows.length ? Object.keys(rows[0])[0] : '';

    return rows.map(x => x[key]);
  }

  private async getTableColumns(tableName: string, options: string | ConnectionOptions): Promise<DecoratorStorage.Column[]> {
    let query = 'DESCRIBE `' + tableName + '`';
    let rows: ColumnMetadata[] = (await this.runQuery(query, options))[0] as any;

    let columns = rows.map(row => {
      return new DecoratorStorage.Column({
        name: row.Field,
        dbName: row.Field,
        isColumn: true,
        isArray: false,
        isNavigationProperty: false,
        isForeignKey: false,
        options: {
          columnName: row.Field,
          default: row.Default,
          generated: row.Extra.includes('auto_increment'),
          index: row.Key === 'MUL',
          primaryKey: row.Key === 'PRI',
          unique: row.Key === 'UNI',
          nullable: row.Null === 'YES',
          type: row.Type
        }
      });
    });

    return columns;
  }

  private async getTableForeignKeys(tableName: string, options: string | ConnectionOptions): Promise<ForeignKeyMetadata[]> {
    let query = `
    SELECT
      TABLE_NAME,
      COLUMN_NAME,
      CONSTRAINT_NAME,
      REFERENCED_TABLE_NAME,
      REFERENCED_COLUMN_NAME
    FROM
      INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE
      TABLE_SCHEMA = DATABASE()
      AND
      REFERENCED_TABLE_SCHEMA = DATABASE()
      AND
      TABLE_NAME = '${tableName}';
    `;

    let rows: ForeignKeyMetadata[] = (await this.runQuery(query, options))[0] as any;
    return rows;
  }
}
