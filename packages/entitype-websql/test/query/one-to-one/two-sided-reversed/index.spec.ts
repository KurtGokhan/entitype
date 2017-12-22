import { setupConfiguration } from '../../../helper';
import { expect } from 'chai';
import { Context } from './entity/Context';

describe('entitype-websql > query > one-to-one > two-sided-reversed', async () => {
  beforeEach(setupConfiguration);

  it('should be able to select from owned side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to
      .match(/SELECT .* FROM model as t0 LEFT JOIN childmodel as t\d+ ON t\d+.parent_id = t0.id/i);
  });


  it('should be able to select from owner side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.childmodels.include(x => x.parent).select(x => x.name).toList.query;
    expect(loadModelQuery).to
      .match(/SELECT t.* FROM childmodel as t0 LEFT JOIN model as t\d+ ON t0.parent_id = t\d+.id/i);
  });
});
