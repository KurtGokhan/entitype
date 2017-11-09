import { ColumnDecorator } from './';

// Reference: https://dev.mysql.com/doc/refman/5.7/en/data-types.html

export type DbTypeSelector = {
  boolean: () => ColumnDecorator;
  bit: (size?: number) => ColumnDecorator;
  int: (size?: number) => ColumnDecorator;

  decimal: (m?: number, d?: number) => ColumnDecorator;
  double: (m?: number, d?: number) => ColumnDecorator;
  float: (m?: number, d?: number) => ColumnDecorator;

  date: () => ColumnDecorator;
  year: () => ColumnDecorator;
  time: (fsp?: number) => ColumnDecorator;
  datetime: (fsp?: number) => ColumnDecorator;
  timestamp: (fsp?: number) => ColumnDecorator;


  char: (length?: number | 'max' | undefined) => ColumnDecorator;
  varchar: (length?: number | 'max' | undefined) => ColumnDecorator;
  nchar: (length?: number | 'max' | undefined) => ColumnDecorator;
  nvarchar: (length?: number | 'max' | undefined) => ColumnDecorator;

  binary: (size?: number) => ColumnDecorator;
  varbinary: (size?: number) => ColumnDecorator;

  text: (size?: number) => ColumnDecorator;
  blob: (size?: number) => ColumnDecorator;
  enum: (...values: string[]) => ColumnDecorator;
  set: (...values: string[]) => ColumnDecorator;

  json: () => ColumnDecorator;
  custom: (name: string, ...args: any[]) => ColumnDecorator;
};
