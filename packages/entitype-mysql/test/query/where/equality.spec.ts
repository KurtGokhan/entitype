import { expect } from 'chai';
import { Context } from './entity/Context';

describe('entitype-mysql > query > where > equality', async () => {
  it('should be able to filter selection', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.id).equals(1)
      .toList;
    let query = listNode.query;
    expect(query).to.match(/SELECT .* FROM model as t0 WHERE .*t0.id = 1.*/i);
  });

  it('should be able to filter selection with not', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.id).not.equals(1)
      .toList;
    let query = listNode.query;
    expect(query).to.match(/SELECT .* FROM model as t0 WHERE .*NOT t0.id = 1.*/i);
  });
});
