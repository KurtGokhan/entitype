import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > where > boolean', async () => {
  it('should be able to filter by true boolean columns', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.active.equals(true))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( active = 1 ) )');
  });

  it('should be able to filter by false boolean columns', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.active.equals(false))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE ( ( active = 0 ) )');
  });
});
