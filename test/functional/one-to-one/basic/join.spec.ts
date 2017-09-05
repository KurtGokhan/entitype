import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > one-to-one > basic > join', async () => {

  it('should be able to select from owning side', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to
      .match(/SELECT .* FROM model as t0 LEFT JOIN childmodel as t\d+ ON t0.child_id = t\d+.id/i);
  });
});
