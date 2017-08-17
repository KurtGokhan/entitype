import { PropertyExpression } from '../fluent';
import { ObjectType } from "src/fluent/expressions";

export type ColumnDecorator = PropertyDecorator & ColumnDecoratorBuilder;

export type ColumnDecoratorBuilder = {
  type(value: string): ColumnDecorator;
  columnName(value: string): ColumnDecorator;
  default(value: (() => any) | any): ColumnDecorator;
  nullable(value?: boolean): ColumnDecorator;
  unique(value?: boolean): ColumnDecorator;
  length(value: number | 'max' | undefined): ColumnDecorator;
  primaryKey(generated?: boolean): ColumnDecorator;
  index(value?: boolean): ColumnDecorator;
}

export type ColumnOptions = {
  type?: string;
  columnName?: string;
  default?: (() => any) | any;
  unique?: boolean;
  nullable?: boolean;
  varCharLength?: number | 'max' | undefined;
  primaryKey?: boolean;
  index?: boolean;
};




type OneToOneDecorator = PropertyDecorator;
