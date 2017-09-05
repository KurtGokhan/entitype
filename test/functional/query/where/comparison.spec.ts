import { Context } from './entity/Context';
import { expect } from 'chai';

describe('query > where > comparison', async () => {
  it('should be able to filter with lessThan', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.id().lt(5))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( t0.id < 5 ) )');
  });

  it('should be able to filter with not lessThan', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.id().not.lt(5))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( NOT t0.id < 5 ) )');
  });

  it('should be able to filter with lessThanOrEqual', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.id().lte(5))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( t0.id <= 5 ) )');
  });

  it('should be able to filter with greaterThan', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.id().gt(5))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( t0.id > 5 ) )');
  });

  it('should be able to filter with greaterThanOrEqual', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.id().gte(5))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( t0.id >= 5 ) )');
  });

  it('should be able to filter with between', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.id().between(5, 10))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( t0.id BETWEEN 5 AND 10 ) )');
  });

  it('should be able to filter with not between', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.id().not.between(5, 10))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( NOT t0.id BETWEEN 5 AND 10 ) )');
  });
});
