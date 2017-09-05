import { Context } from './entity/Context';
import { expect } from 'chai';

describe('query > where > null', async () => {
  it('should be able to filter selection where null', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name().isNull())
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( name IS NULL ) )`);
  });

  it('should be able to filter selection where not null', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name().not.isNull())
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( NOT name IS NULL ) )`);
  });
});
