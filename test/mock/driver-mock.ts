import { container, DriverAdapter } from 'src/ioc';

import { DI_TYPES } from '../../src/ioc';
import { QueryBuilderAdapter } from '../../src/ioc/index';

export function mockDriverToReturnData(data) {
  let driver: DriverAdapter = {
    runQuery: (query) => {
      return data;
    }
  };

  let builder: QueryBuilderAdapter = {
    buildQuery: () => ''
  };

  container.bind(DI_TYPES.driver).toConstantValue(driver).whenTargetNamed('mock');
  container.bind(DI_TYPES.queryBuilder).toConstantValue(builder).whenTargetNamed('mock');
}
