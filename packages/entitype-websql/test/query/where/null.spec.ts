import { expect } from 'chai';
import { Context } from './entity/Context';

describe('query > where > null', async () => {
  it('should be able to filter selection where null', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name).isNull()
      .toList;
    let query = listNode.query;
    expect(query).to.match(/SELECT .* FROM model as t0 WHERE .*t0.name IS NULL.*/i);
  });

  it('should be able to filter selection where not null', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name).not.isNull()
      .toList;
    let query = listNode.query;
    expect(query).to.match(/SELECT .* FROM model as t0 WHERE .*NOT t0.name IS NULL.*/i);
  });
});
