import { ConnectionOptions, useConfiguration } from 'src';
import { PropertyPath } from 'src/fluent';
import { container, DI_TYPES, DriverAdapter, QueryBuilderAdapter } from 'src/ioc';
import { QueryContext, RowData } from 'src/plugins';

export function mockDriverToReturnData(data: RowData[], builderCallback?: (ctx: QueryContext) => void) {
  let mockConfig: ConnectionOptions = { adapter: 'mock' };
  useConfiguration(mockConfig);

  let driver: DriverAdapter = {
    runQuery: (query) => {
      return Promise.resolve([data]);
    }
  } as any;

  let builder: QueryBuilderAdapter = {
    buildQuery: (ctx) => {
      if (builderCallback) builderCallback(ctx);
      return '';
    }
  };

  container.bind(DI_TYPES.driver).toConstantValue(driver).whenTargetNamed('mock');
  container.bind(DI_TYPES.queryBuilder).toConstantValue(builder).whenTargetNamed('mock');
}

export function mockDriverToReturnDataWithoutAlias(data: RowData[], builderCallback?: (ctx: QueryContext) => void) {
  let mockConfig: ConnectionOptions = { adapter: 'mock' };
  useConfiguration(mockConfig);

  let driver: DriverAdapter = {
    runQuery: (query) => {
      return Promise.resolve([data]);
    }
  } as any;

  let builder: QueryBuilderAdapter = {
    buildQuery: (ctx) => {
      if (builderCallback) builderCallback(ctx);
      data = data.map(x => mapObjectToAlias(x, ctx, [], {}));
      return '';
    }
  };

  container.bind(DI_TYPES.driver).toConstantValue(driver).whenTargetNamed('mock');
  container.bind(DI_TYPES.queryBuilder).toConstantValue(builder).whenTargetNamed('mock');
}

function mapObjectToAlias(object, ctx: QueryContext, path: PropertyPath, newObj) {
  let keys = Object.keys(object);

  newObj = newObj || {};

  for (let index = 0; index < keys.length; index++) {
    let key = keys[index];
    let value = object[key];

    let newPath = path.concat([key]);
    if (typeof value === 'object')
      mapObjectToAlias(value, ctx, newPath, newObj);
    else
      newObj[ctx.getAliasForColumn(newPath)] = value;
  }

  return newObj;
}
