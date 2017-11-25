export interface NamingStrategy {
  tableNameToEntityName(tableName: string): string;
  mappingTableNameToEntityName(tableName: string): string;
  tableNameToEntityFileName(tableName: string): string;
  tableNameToContextPropertyName(tableName: string): string;

  columnNameToPropertyName(columnName: string): string;
  oneToOneNavigationPropertyName(propName: string): string;
  oneToManyNavigationPropertyName(propName: string): string;
  manyToOneNavigationPropertyName(propName: string): string;
  manyToManyNavigationPropertyName(propName: string): string;

  databaseNameToContextName(dbName: string): string;
  databaseNameToContextFileName(dbName: string): string;
}
