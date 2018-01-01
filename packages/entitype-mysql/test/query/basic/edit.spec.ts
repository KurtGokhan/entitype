import { expect } from 'chai';
import { container, DI_TYPES } from 'entitype/dist/plugins';

import { setupConfiguration } from '../../helper';
import { Context } from './entity/Context';
import { Model } from './entity/Model';

describe.skip('entitype-mysql > query > edit', async () => {
  beforeEach(setupConfiguration);
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());


  it('should be able to insert', async () => {
    mockDriver((query) => {
      expect(query).to.match(/INSERT into Model \(id, name\) VALUES \(\?,\?\) /i);
    });

    let entry = new Model();
    entry.id = 5;
    entry.name = 'Entry1';

    let ctx = new Context();
    ctx.models.insert(entry);
  });


  it('should be able to persist', async () => {
    mockDriver((query) => {
      expect(query).to.match(/INSERT into Model \(id, name\) VALUES \(\?,\?\) ON DUPLICATE KEY UPDATE id = VALUES\(id\), name = VALUES\(name\)/i);
    });

    let entry = new Model();
    entry.id = 5;
    entry.name = 'Entry1';

    let ctx = new Context();
    ctx.models.insert(entry);
  });

  it('should be able to update', async () => {
    mockDriver((query) => {
      expect(query).to.match(/UPDATE Model SET name = \? WHERE id = 5/i);
    });

    let entry = new Model();
    entry.id = 5;
    entry.name = 'Entry1';

    let ctx = new Context();
    ctx.models.update(entry);
  });
});


export function mockDriver(queryCallback?: (query: string) => void) {
  let driver = {
    runQuery: (query) => {
      if (queryCallback) queryCallback(query);
      return Promise.resolve([]);
    }
  } as any;

  container.rebind(DI_TYPES.driver).toConstantValue(driver).whenTargetNamed('mysql');
}
