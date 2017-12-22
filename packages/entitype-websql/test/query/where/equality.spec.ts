import { expect } from 'chai';
import { setupConfiguration } from '../../helper';
import { Context } from './entity/Context';

describe('entitype-websql > query > where > equality', async () => {
  beforeEach(setupConfiguration);

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
