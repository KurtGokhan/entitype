import { expect } from 'chai';
import { ConnectionOptions } from 'src';
import { container, DI_TYPES, Driver, DriverAdapter, QueryBuilder, QueryBuilderAdapter, QueryContext } from 'src/plugins';

describe('ioc > plugin', async () => {
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



  it('should be able to register query builder', async () => {
    let builderName = 'test-builder-name';

    @QueryBuilder(builderName)
    class TestBuilder implements QueryBuilderAdapter {
      buildQuery(context: QueryContext): string {
        throw new Error('Method not implemented.');
      }
    }

    expect(container.isBound(DI_TYPES.queryBuilder));
    expect(container.getNamed(DI_TYPES.queryBuilder, builderName).constructor).to.be.equal(TestBuilder);
  });

});
