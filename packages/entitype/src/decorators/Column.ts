import 'reflect-metadata';
import { EntitypeMetadata } from '../common/EntitypeMetadata';
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

    let column = EntitypeMetadata.addColumn(target.constructor, propertyKey, () => metadata, options);
    column.isColumn = true;
  };

  retType['type'] = new Proxy(function () { }, {
    get(target, propertyName: string) {
      return function (...args) {
        let baseName: string;
        let typeArgs: any[];
        if (propertyName === 'custom') {
          [baseName, ...typeArgs] = args;
        }
        else {
          baseName = propertyName;
          typeArgs = args;
        }
        let type = constructType(baseName, typeArgs);
        return Column(Object.assign({}, options, { type }));
      };
    },

    apply(target, thisArg, argumentsList) {
      let [baseName, ...typeArgs] = argumentsList;
      let type = constructType(baseName, typeArgs);
      return Column(Object.assign({}, options, { type }));
    }
  });
  retType['columnName'] = columnName => Column(Object.assign({}, options, { columnName }));
  retType['nullable'] = nullable => Column(Object.assign({}, options, { nullable: nullable !== false }));
  retType['unique'] = unique => Column(Object.assign({}, options, { unique: unique !== false }));
  retType['primaryKey'] = generated => Column(Object.assign({}, options, { primaryKey: true, generated: !!generated }));
  retType['index'] = index => Column(Object.assign({}, options, { index: index !== false }));
  retType['default'] = defValue => Column(Object.assign({}, options, { default: defValue }));

  return retType as ColumnDecorator;
}

function constructType(baseName: string, typeArgs: any[]) {
  return baseName + (typeArgs.length ? '(' + typeArgs.join(',') + ')' : '');
}
