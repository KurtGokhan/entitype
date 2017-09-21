import { Context } from './entity/Context';
import { expect } from 'chai';

describe('query > where > like', async () => {
  it('should be able to filter selection', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name().like('%name%'))
      .toList;
    let query = listNode.query;
    expect(query).to.match(/SELECT .* FROM model as t0 WHERE .*t0.name like '%name%'.*/i);
  });

  it('should be able to filter selection with not', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name().not.like('%name%'))
      .toList;
    let query = listNode.query;
    expect(query).to.match(/SELECT .* FROM model as t0 WHERE .*NOT t0.name like '%name%'.*/i);
  });
});
