import { DI_TYPES } from '../../src/ioc';
import { container, DriverAdapter } from 'src/ioc';
export function mockDriverToReturnData(data) {
  let driver: DriverAdapter = {
    runQuery: (query) => {
      return data;
    }
  };

  container.bind(DI_TYPES.driver).toConstantValue(driver).whenTargetNamed('mock');
}
