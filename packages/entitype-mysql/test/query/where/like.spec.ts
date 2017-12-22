import { expect } from 'chai';
import { setupConfiguration } from '../../helper';
import { Context } from './entity/Context';

describe('entitype-mysql > query > where > like', async () => {
  beforeEach(setupConfiguration);

  it('should be able to filter selection', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name).like('%name%')
      .toList;
    let query = listNode.query;
    expect(query).to.match(/SELECT .* FROM model as t0 WHERE .*t0.name like '%name%'.*/i);
  });

  it('should be able to filter selection with not', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name).not.like('%name%')
      .toList;
    let query = listNode.query;
    expect(query).to.match(/SELECT .* FROM model as t0 WHERE .*NOT t0.name like '%name%'.*/i);
  });
});
