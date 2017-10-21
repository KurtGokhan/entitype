import { ConnectionOptions, useConfiguration } from 'src';
import { container, DI_TYPES, DriverAdapter, QueryBuilderAdapter } from 'src/ioc';
import { QueryContext } from 'src/plugins';

export function mockDriverToReturnData(data, builderCallback?: (ctx: QueryContext) => void) {
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
