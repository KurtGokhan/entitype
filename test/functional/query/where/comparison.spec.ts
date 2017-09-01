import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > where > comparison', async () => {
  it('should be able to filter with lessThan', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id().lt(5))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( id < 5 ) )');
  });

  it('should be able to filter with not lessThan', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id().not.lt(5))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( NOT id < 5 ) )');
  });

  it('should be able to filter with lessThanOrEqual', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id().lte(5))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( id <= 5 ) )');
  });

  it('should be able to filter with greaterThan', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id().gt(5))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( id > 5 ) )');
  });

  it('should be able to filter with greaterThanOrEqual', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id().gte(5))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( id >= 5 ) )');
  });

  it('should be able to filter with between', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id().between(5, 10))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( id BETWEEN 5 AND 10 ) )');
  });

  it('should be able to filter with not between', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id().not.between(5, 10))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( NOT id BETWEEN 5 AND 10 ) )');
  });
});
