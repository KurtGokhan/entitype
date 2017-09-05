import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > one-to-one > reversed > join', async () => {

  it('should be able to select from owned side', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to.
      match(/SELECT .* FROM model as t0 LEFT JOIN childmodel as t\d+ ON t\d+.parent_id = t0.id/i);
  });
});
