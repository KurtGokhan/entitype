import { IQueryable } from '../../../../src/fluent/interfaces/types';
import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > where > null', async () => {
  it('should be able to filter selection where null', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.name.isNull())
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT * FROM model WHERE name IS NULL`);
  });

  it('should be able to filter selection where not null', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.name.not.isNull())
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT * FROM model WHERE name IS NOT NULL`);
  });
});
