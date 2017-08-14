import { IQueryable } from '../../../../src/fluent/interfaces/types';
import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > where', async () => {
  it('should be able to filter selection', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id.equals(1))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT * FROM model WHERE id = 1');
  });

  it('should be able to filter selection with aliases', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx
      .where(x => x.id.equals(1))
      .select(x => ({ nameAlias: x.name, idAlias: x.id }))
      .toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT name as NameAlias, id as idAlias FROM model WHERE idAlias = 1');
  });

});
