import { IQueryable } from '../../../../src/fluent/interfaces/types';
import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > basic', async () => {

  it('should be able to select all', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT * FROM model');

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });


  it('should be able to select single column as scalar', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.select(x => x.id).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT id FROM model');
  });

  it('should be able to select specific columns with aliases', async () => {
    let ctx = new DbSet(Model);
    let listNode = ctx.select(x => ({ nameAlias: x.name, idAlias: x.id })).toList;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase('SELECT name as NameAlias, id as idAlias FROM model');
  });

});
