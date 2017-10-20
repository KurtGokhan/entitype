import { expect } from 'chai';
import { Context } from './entity/Context';

describe('query > one-to-one > two-sided', async () => {

  it('should be able to select from owner side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to
      .match(/SELECT .* FROM model as t0 LEFT JOIN childmodel as t\d+ ON t0.child_id = t\d+.id/i);
  });


  it('should be able to select from owned side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.childmodels.include(x => x.parent).select(x => x.name).toList.query;
    expect(loadModelQuery).to
      .match(/SELECT t.* FROM childmodel as t0 LEFT JOIN model as t\d+ ON t2.child_id = t\d+.id/i);
  });
});
