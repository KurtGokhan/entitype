import { setupConfiguration } from '../../helper';
import { expect } from 'chai';
import { Context } from './entity/Context';

describe('entitype-websql > query > where > boolean', async () => {
  beforeEach(setupConfiguration);

  it('should be able to filter by true boolean columns', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.active).equals(true)
      .toList;
    let query = listNode.query;
    expect(query).to.match(/SELECT .* FROM model as t0 WHERE .*t0.active = 1.*/i);
  });

  it('should be able to filter by false boolean columns', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.active).equals(false)
      .toList;
    let query = listNode.query;
    expect(query).to.match(/SELECT .* FROM model as t0 WHERE .*t0.active = 0.*/i);
  });
});
