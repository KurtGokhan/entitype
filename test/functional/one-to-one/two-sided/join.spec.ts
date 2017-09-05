import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { ChildModel } from './entity/ChildModel';
import { expect } from 'chai';

describe('query > one-to-one > two-sided > join', async () => {

  it('should be able to select from owned side', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to
      .match(/SELECT .* FROM model as t0 LEFT JOIN childmodel as t\d+ ON t\d+.parent_id = t0.id/i);
  });


  it('should be able to select from owner side', async () => {
    let ctx = new DbSet(ChildModel);
    let loadModelQuery = ctx.include(x => x.parent).select(x => x.name).toList.query;
    expect(loadModelQuery).to
      .match(/SELECT t.* FROM childmodel as t0 LEFT JOIN model as t\d+ ON t0.parent_id = t\d+.id/i);
  });
});
