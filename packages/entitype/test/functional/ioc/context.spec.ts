import { expect } from 'chai';
import { ConnectionOptions, useConfiguration } from '../../../src';
import { container } from '../../../src/plugins';
import { EntitypeContext } from '../../../src/query/EntitypeContext';

describe('entitype > ioc > Context', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());

  let config: ConnectionOptions = {
    adapter: ''
  };

  let namedConfig: ConnectionOptions = {
    adapter: ''
  };

  let otherConfig: ConnectionOptions = {
    adapter: ''
  };

  let configName = 'test-config-name';

  class TestContext extends EntitypeContext { }


  it('should be retrieve default config for context', async () => {

    useConfiguration(config);
    useConfiguration(namedConfig, configName);

    let ctx = new TestContext();

    expect(ctx.connectionOptions).to.be.equal(config);
  });


  it('should be retrieve named config for context', async () => {
    useConfiguration(config);
    useConfiguration(namedConfig, configName);

    let ctx = new TestContext(configName);

    expect(ctx.connectionOptions).to.be.equal(namedConfig);
  });


  it('should be set config explicitly for context', async () => {
    useConfiguration(config);
    useConfiguration(namedConfig, configName);

    let ctx = new TestContext(otherConfig);

    expect(ctx.connectionOptions).to.be.equal(otherConfig);
  });

});
