import { DbTypeSelector } from './Types';
export * from './Column';
export * from './DbCollection';
export * from './Entity';
export * from './OneToOne';
export * from './ManyToMany';
export * from './ManyToOne';
export * from './OneToMany';


export type DbCollectionDecorator = PropertyDecorator;
export type NavigationPropertyDecorator = PropertyDecorator;



export type ColumnDecorator = PropertyDecorator & ColumnDecoratorBuilder;
export type ColumnDecoratorBuilder = {
  type: DbTypeSelector;
  columnName(value: string): ColumnDecorator;
  default(value: (() => any) | any): ColumnDecorator;
  nullable(value?: boolean): ColumnDecorator;
  unique(value?: boolean): ColumnDecorator;
  primaryKey(generated?: boolean): ColumnDecorator;
  index(value?: boolean): ColumnDecorator;
};

export type ColumnOptions = {
  type?: StandardTypeInfo;
  columnName?: string;
  default?: (() => any) | any;
  unique?: boolean;
  nullable?: boolean;
  primaryKey?: boolean;
  generated?: boolean;
  index?: boolean;
};

export const DefaultColumnOptions: ColumnOptions = {
  type: undefined,
  columnName: undefined,
  default: undefined,
  unique: false,
  nullable: true,
  primaryKey: false,
  index: false,
  generated: false
};

export type StandardTypeInfo = {
  name: string;
  arguments: any[];
};

export type EntityDecorator = ClassDecorator & EntityDecoratorBuilder;
export type EntityDecoratorBuilder = {
  tableName(value: string): EntityDecorator;
};

export type EntityOptions = {
  tableName?: string;
};

export const DefaultEntityOptions: EntityOptions = {
  tableName: undefined,
};
