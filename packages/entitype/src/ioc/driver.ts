import { decorate, injectable } from 'inversify';

import { EntitypeMetadata } from '../common/EntitypeMetadata';
import { ConnectionOptions } from '../configuration';
import { ColumnData, DI_TYPES, RowData } from './';
import { container } from './';

export function Driver(name: string): ClassDecorator {
  return (target) => {
    decorate(injectable(), target);
    container.bind<DriverAdapter>(DI_TYPES.driver).to(<any>target).whenTargetNamed(name);
  };
}

export interface DriverAdapter {
  runQuery(query: string, options: string | ConnectionOptions): Promise<[RowData[], ColumnData[]]>;
  getEntities(options: string | ConnectionOptions): Promise<EntitypeMetadata.Entity[]>;
}
