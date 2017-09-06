import { useConfiguration, ConnectionOptions } from 'src/configuration';
import { mockDriverToReturnData } from 'test/mock/driver-mock';
import { container } from 'src/ioc';
import { Context } from './entity/Context';
import { expect } from 'chai';

describe('mapping > join', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());

  let mockConfig: ConnectionOptions = {
    adapter: 'mock'
  };

  it('should be able to get joined tables and map them');

});
