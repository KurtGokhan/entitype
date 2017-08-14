import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > escape', async () => {

  it('should escape filter parameters', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.where(x => x.name.equals(' % name \' " ')).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT * FROM model WHERE ( ( name = ' \\% name \\' \\" ' ) )`);

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });

  it('should escape ignore percentage symbol in like', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx.where(x => x.name.like(' % name \' " ')).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT * FROM model WHERE ( ( name LIKE ' % name \\' \\" ' ) )`);

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });


  it('should be able to query short date', async () => {
    let ctx = new DbSet(Model);
    let date = new Date(Date.UTC(1990, 6, 6));
    let loadModelQuery = ctx.where(x => x.createdDate.gt(date)).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT * FROM model WHERE ( ( createdDate > '1990-07-06 00:00:00' ) )`);

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });

  it('should be able to query long date', async () => {
    let ctx = new DbSet(Model);
    let date = new Date(Date.UTC(1990, 6, 6, 23, 58, 24));
    let loadModelQuery = ctx.where(x => x.createdDate.gt(date)).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT * FROM model WHERE ( ( createdDate > '1990-07-06 23:58:24' ) )`);

    let results = await ctx.toList();
    expect(results).to.be.eql([]);
  });
});
