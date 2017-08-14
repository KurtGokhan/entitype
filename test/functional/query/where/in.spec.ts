
import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > where > in', async () => {
  it('should be able to filter selection', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id.in([1, 2]))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( id in (1,2) ) )');
  });

  it('should be able to filter selection with not', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id.not.in([1, 2]))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( NOT id in (1,2) ) )');
  });
});
