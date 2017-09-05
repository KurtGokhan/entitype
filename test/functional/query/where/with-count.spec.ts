import { Context } from './entity/Context';
import { expect } from 'chai';

describe('query > where > with count', async () => {
  it('should be able to filter selection and take count', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name().isNull())
      .count;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT Count(*) as count FROM model as t0 WHERE ( ( name IS NULL ) )`);
  });

  it('should be able to filter selection with not and take count', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name().not.isNull())
      .count;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT Count(*) as count FROM model as t0 WHERE ( ( NOT name IS NULL ) )`);
  });
});
