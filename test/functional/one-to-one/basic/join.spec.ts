import { Context } from './entity/Context';
import { expect } from 'chai';

describe('query > one-to-one > basic > join', async () => {


  // TODO: write tests for implicit and explicit include
  it('should be able to select from owning side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to
      .match(/SELECT .* FROM model as t0 LEFT JOIN childmodel as t\d+ ON t0.child_id = t\d+.id/i);
  });
});
