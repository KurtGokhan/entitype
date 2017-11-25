import { NamingStrategy } from './NamingStrategy';

export class NoopNamingStrategy implements NamingStrategy {
  tableNameToEntityName(tableName: string): string {
    return tableName;
  }

  mappingTableNameToEntityName(tableName: string): string {
    return tableName;
  }

  tableNameToEntityFileName(tableName: string): string {
    return tableName;
  }

  tableNameToContextPropertyName(tableName: string): string {
    return tableName;
  }

  columnNameToPropertyName(columnName: string): string {
    return columnName;
  }

  oneToOneNavigationPropertyName(propName: string): string {
    return propName;
  }

  oneToManyNavigationPropertyName(propName: string): string {
    return propName;
  }

  manyToOneNavigationPropertyName(propName: string): string {
    return propName;
  }

  manyToManyNavigationPropertyName(propName: string): string {
    return propName;
  }

  databaseNameToContextName(dbName: string): string {
    return dbName + 'Context';
  }

  databaseNameToContextFileName(dbName: string): string {
    return dbName + 'Context';
  }
}
