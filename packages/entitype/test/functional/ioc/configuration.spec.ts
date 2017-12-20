import { expect } from 'chai';
import { ConnectionOptions, useConfiguration } from 'entitype/src';
import { container, DI_TYPES } from 'entitype/src/plugins';

describe('ioc > Driver', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());

  let configName = 'test-driver-name';

  let config: ConnectionOptions = {
    adapter: configName
  };

  let config2: ConnectionOptions = {
    adapter: configName
  };

  it('should be able to register and re-register config to default', async () => {
    useConfiguration(config);
    expect(container.isBound(DI_TYPES.configuration));
    expect(container.get(DI_TYPES.configuration)).to.be.equal(config);

    useConfiguration(config2);
    expect(container.get(DI_TYPES.configuration)).to.be.equal(config2);
  });

  it('should be able to register config with name', async () => {
    useConfiguration(config, configName);
    expect(container.isBound(DI_TYPES.configuration));
    expect(container.getNamed(DI_TYPES.configuration, configName)).to.be.equal(config);

    useConfiguration(config2, configName);
    expect(container.getNamed(DI_TYPES.configuration, configName)).to.be.equal(config2);
  });
});
