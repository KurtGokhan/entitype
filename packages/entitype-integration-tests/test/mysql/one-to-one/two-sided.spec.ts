import { integrationTestDatabaseSeed } from '../integration-helper';
import { expect } from 'chai';
import { Context } from 'test/mysql/config/entities/Context';

describe('query > one-to-one > two-sided > join', async () => {
  beforeEach(integrationTestDatabaseSeed);

  it('should be able to select from owned side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT name FROM model LEFT JOIN'
      + ' childmodel ON childmodel.parent_id = model.id');
  });


  it('should be able to select from owner side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.childModels.include(x => x.parent).select(x => x.name).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT name FROM childmodel LEFT JOIN'
      + ' model ON childmodel.parent_id = model.id');
  });
});
