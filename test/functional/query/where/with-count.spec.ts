import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > where > with count', async () => {
  it('should be able to filter selection and take count', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.name.isNull())
      .count;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT Count(*) FROM model WHERE ( ( name IS NULL ) )`);
  });

  it('should be able to filter selection with not and take count', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.name.not.isNull())
      .count;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT Count(*) FROM model WHERE ( ( NOT name IS NULL ) )`);
  });
});