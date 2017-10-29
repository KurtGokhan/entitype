import { DecoratorStorage } from '../common/DecoratorStorage';
import { EntityDecorator, EntityOptions } from './index';

export function Entity(): EntityDecorator;
export function Entity(columnName: string): EntityDecorator;
export function Entity(options: EntityOptions): EntityDecorator;

export function Entity(optionsOrName?: EntityOptions | string): EntityDecorator {
  let options: EntityOptions;

  if (typeof optionsOrName === 'string')
    options = { tableName: optionsOrName as string };
  else
    options = optionsOrName || {};

  let retType = (target) => {
    DecoratorStorage.addEntity(target, options);
  };

  retType['tableName'] = tableName => Entity(Object.assign({}, options, { tableName }));

  return retType as EntityDecorator;
}
