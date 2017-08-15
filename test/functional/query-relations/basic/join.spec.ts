import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > relations > basic > join', async () => {

  it('should be able to select all', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT * FROM model');

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });
});
