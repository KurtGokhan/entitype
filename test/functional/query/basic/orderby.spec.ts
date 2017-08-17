import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > basic > orderby', async () => {

  it('should be able to order by ascending', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.orderByAscending(x => x.id).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT * FROM model ORDER BY id ASC');

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });

  it('should be able to order by descending', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.orderByDescending(x => x.name).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT * FROM model ORDER BY name DESC');

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });


  it('should be able to combine orders', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.orderByDescending(x => x.id).thenByAscending(x => x.name).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase('SELECT * FROM model ORDER BY id DESC , name ASC');

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });
});
