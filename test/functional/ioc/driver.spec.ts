import { ConnectionOptions, DriverAdapter, Driver, container, DI_TYPES } from 'src';
import { expect } from 'chai';

describe('ioc > Driver', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());

  it('should be able to register driver', async () => {
    let driverName = 'test-driver-name';

    @Driver(driverName)
    class TestDriver implements DriverAdapter {
      runQuery(query: string, options: string | ConnectionOptions): Promise<any> {
        throw new Error('Method not implemented.');
      }
    }

    expect(container.isBound(DI_TYPES.driver));
    expect(container.getNamed(DI_TYPES.driver, driverName).constructor).to.be.equal(TestDriver);
  });
});
