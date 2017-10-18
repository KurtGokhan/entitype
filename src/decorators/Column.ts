import 'reflect-metadata';
import { ColumnDecorator, ColumnOptions } from './';
import { DecoratorStorage } from '../storage/DecoratorStorage';


export function Column(options?: ColumnOptions): ColumnDecorator {
  options = options || {};

  let retType = (target, propertyKey) => {
    let metadata = Reflect.getMetadata('design:type', target, propertyKey);

    let column = DecoratorStorage.addColumn(target.constructor, propertyKey, metadata, options);
    column.isColumn = true;
    DecoratorStorage.updateEntityReferences(column.parent);
  };

  retType['type'] = type => Column(Object.assign({}, options, { type }));
  retType['columnName'] = columnName => Column(Object.assign({}, options, { columnName }));
  retType['nullable'] = nullable => Column(Object.assign({}, options, { nullable: nullable !== false }));
  retType['unique'] = unique => Column(Object.assign({}, options, { unique: unique !== false }));
  retType['varCharLength'] = varCharLength => Column(Object.assign({}, options, { varCharLength }));
  retType['primaryKey'] = generated => Column(Object.assign({}, options, { primaryKey: true, generated }));
  retType['index'] = index => Column(Object.assign({}, options, { index: index !== false }));
  retType['default'] = defValue => Column(Object.assign({}, options, { default: defValue }));

  return retType as ColumnDecorator;
}
