import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > relations > basic > join', async () => {

  it('should be able to select all', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.select(x => x.child.name).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT [t2].[name] as [res] FROM model [t1] INNER JOIN'
      + ' childmodel [t2] on [t1].[child_id] = [t2].[id]');

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });
});
