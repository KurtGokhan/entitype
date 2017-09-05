import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > where > combine', async () => {
  it('should be able to combine multiple conditions with and', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.name().isNull())
      .andWhere(x => x.id().between(5, 10))
      .andWhere(x => x.id().not.equals(6))
      .toList;
    let query = listNode.query;
    expect(query).to.be
      .equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( name IS NULL ) AND ( id BETWEEN 5 AND 10 ) AND ( NOT id = 6 ) )`);
  });

  it('should be able to combine multiple conditions with or', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.name().isNull())
      .or
      .where(x => x.id().between(5, 10))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( name IS NULL ) ) OR ( ( id BETWEEN 5 AND 10 ) )`);
  });


  it('should be able to combine multiple conditions with and/or', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.name().isNull())
      .or
      .where(x => x.id().between(5, 10))
      .andWhere(x => x.id().not.equals(6))
      .toList;
    let query = listNode.query;
    expect(query).to.be
      .equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( name IS NULL ) ) OR ( ( id BETWEEN 5 AND 10 ) AND ( NOT id = 6 ) )`);
  });
});
