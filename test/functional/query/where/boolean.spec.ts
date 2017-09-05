import { Context } from './entity/Context';
import { expect } from 'chai';

describe('query > where > boolean', async () => {
  it('should be able to filter by true boolean columns', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.active().equals(true))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( t0.active = 1 ) )');
  });

  it('should be able to filter by false boolean columns', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.active().equals(false))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( t0.active = 0 ) )');
  });
});
