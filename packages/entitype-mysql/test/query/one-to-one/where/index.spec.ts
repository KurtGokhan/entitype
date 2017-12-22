import { expect } from 'chai';
import { setupConfiguration } from '../../../helper';
import { Context } from './entity/Context';

describe('entitype-mysql > query > one-to-one > where', async () => {
  beforeEach(setupConfiguration);

  it('should be able to filter from owned side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models
      .where(x => x.child.name).equals('childname')
      .select(x => x.name)
      .toList.query;

    expect(loadModelQuery).to
      .match(/SELECT .* FROM Model as t0 LEFT JOIN ChildModel as t\d+ ON t\d+.parent_id = t0.id WHERE .*t\d+.name = 'childname'.*/i);
  });
});
