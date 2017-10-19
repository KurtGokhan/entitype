import { integrationTestDatabaseSeed } from '../integration-helper';
import { Context } from '../config/entities/Context';
import { expect } from 'chai';

describe('query > one-to-one > basic', async () => {
  beforeEach(integrationTestDatabaseSeed);

  it('should be able to select from owning side', async () => {
    let ctx = new Context();
    let models = await ctx.models.select(x => x.name).toList();
    expect(models).not.to.be.equal(null);
    expect(models.length).to.be.equal(3);
    expect(models[0]).to.be.equal('Model 1');
  });
});
