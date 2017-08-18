import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > relations > reversed > join', async () => {

  it('should be able to select all', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT name FROM model LEFT JOIN'
      + ' childmodel ON childmodel.parent_id = model.id');

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });
});
