import { expect } from 'chai';
import { ConnectionOptions, useConfiguration } from 'src';
import { container, DI_TYPES } from 'src/plugins';

describe('ioc > Driver', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());

  it('should be able to register config to default', async () => {
    let config: ConnectionOptions = {
      adapter: ''
    };

    useConfiguration(config);

    expect(container.isBound(DI_TYPES.configuration));
    expect(container.get(DI_TYPES.configuration)).to.be.equal(config);
  });

  it('should be able to register config with name', async () => {
    let configName = 'test-driver-name';

    let config: ConnectionOptions = {
      adapter: configName
    };

    useConfiguration(config, configName);

    expect(container.isBound(DI_TYPES.configuration));
    expect(container.getNamed(DI_TYPES.configuration, configName)).to.be.equal(config);
  });
});
