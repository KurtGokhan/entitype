import { expect } from 'chai';
import { Context } from 'test/mysql/config/entities/Context';
import { integrationTestDatabaseSeed } from 'test/mysql/integration-helper';

describe('query > one-to-one > reversed > join', async () => {
  beforeEach(integrationTestDatabaseSeed);

  it('should be able to select from owned side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT name FROM model LEFT JOIN'
      + ' childmodel ON childmodel.parent_id = model.id');
  });
});
