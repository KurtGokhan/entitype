import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > where > equality', async () => {
  it('should be able to filter selection', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id().equals(1))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( id = 1 ) )');
  });

  it('should be able to filter selection with not', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id().not.equals(1))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model as t0 WHERE ( ( NOT id = 1 ) )');
  });
});
