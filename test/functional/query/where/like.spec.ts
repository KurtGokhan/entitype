import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > where > like', async () => {
  it('should be able to filter selection', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.name().like('%name%'))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( name like '%name%' ) )`);
  });

  it('should be able to filter selection with not', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.name().not.like('%name%'))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( NOT name like '%name%' ) )`);
  });
});
