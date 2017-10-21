import 'reflect-metadata';
import { DecoratorStorage } from '../storage/DecoratorStorage';
import { ColumnDecorator, ColumnOptions } from './';


export function Column(): ColumnDecorator;
export function Column(columnName: string): ColumnDecorator;
export function Column(options: ColumnOptions): ColumnDecorator;

export function Column(optionsOrName?: ColumnOptions | string): ColumnDecorator {
  let options: ColumnOptions;

  if (typeof optionsOrName === 'string')
    options = { columnName: optionsOrName };
  else
    options = optionsOrName || {};

  let retType = (target, propertyKey) => {
    let metadata = Reflect.getMetadata('design:type', target, propertyKey);

    let column = DecoratorStorage.addColumn(target.constructor, propertyKey, () => metadata, options);
    column.isColumn = true;
    DecoratorStorage.updateEntityReferences(column.parent);
  };

  retType['type'] = type => Column(Object.assign({}, options, { type }));
  retType['columnName'] = columnName => Column(Object.assign({}, options, { columnName }));
  retType['nullable'] = nullable => Column(Object.assign({}, options, { nullable: nullable !== false }));
  retType['unique'] = unique => Column(Object.assign({}, options, { unique: unique !== false }));
  retType['primaryKey'] = generated => Column(Object.assign({}, options, { primaryKey: true, generated: !!generated }));
  retType['index'] = index => Column(Object.assign({}, options, { index: index !== false }));
  retType['default'] = defValue => Column(Object.assign({}, options, { default: defValue }));

  return retType as ColumnDecorator;
}
