import { ConnectionOptions, useConfiguration } from 'entitype/src';
import { setObjectPath } from 'entitype/src/common/util';
import { PropertyPath } from 'entitype/src/fluent';
import { container, DI_TYPES, DriverAdapter, QueryBuilderAdapter } from 'entitype/src/ioc';
import { QueryContext, RowData } from 'entitype/src/plugins';

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
  let keys = object ? Object.keys(object) : [];

  newObj = newObj || {};

  for (let index = 0; index < keys.length; index++) {
    let key = keys[index];
    let value = object[key];

    let newPath = path.concat([key]);
    if (typeof value === 'object' && value)
      mapObjectToAlias(value, ctx, newPath, newObj);
    else {
      try {
        let colInfo = ctx.getColumnInfoForPropertyPath(newPath);
        // Skip properties without column info, like count
        if (colInfo) newObj[ctx.getAliasForColumn(newPath)] = value;
        else newObj = setObjectPath(newObj, newPath, value);
      }
      catch (err) {
        newObj = setObjectPath(newObj, newPath, value);
      }
    }
  }

  return newObj;
}
