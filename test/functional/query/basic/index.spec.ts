import { expect } from 'chai';
import { DbSet } from 'src/collections/DbSet';

import { Context } from './entity/Context';
import { Model } from './entity/Model';

describe('query > basic', async () => {

  it('should be able to select all', async () => {
    let ctx = new Context();
    let query = ctx.models.toList.query;
    expect(query).to.match(/SELECT (.* as a\d+)(, .* as a\d+)* FROM model as (t\d+)/i);
  });


  it('should be able to select single column as scalar', async () => {
    let ctx = new Context();
    let query = ctx.models
      .select(x => x.id)
      .toList
      .query;
    expect(query).to.match(/SELECT id as (a\d+) FROM model as (t\d+)/i);
  });

  it('should be able to select specific columns with aliases', async () => {
    let ctx = new Context();
    let query = ctx.models
      .select(x => ({ nameAlias: x.name, idAlias: x.id }))
      .toList
      .query;
    expect(query).to.be.equalIgnoreCase('SELECT name as a1, id as a2 FROM model as t1');
  });

  it('should be able to limit selection', async () => {
    let ctx = new Context();
    let query = ctx.models
      .select(x => ({ nameAlias: x.name, idAlias: x.id }))
      .take(5)
      .toList
      .query;
    expect(query).to.be.equalIgnoreCase('SELECT TOP 5 name as a1, id as a2 FROM model as t1');
  });

  it('should be able to query count', async () => {
    let ctx = new Context();
    let query = ctx.models.count.query;
    expect(query).to.be.equalIgnoreCase('SELECT COUNT(*) as count FROM model as t1');
  });


  it('should be able to query first', async () => {
    let ctx = new Context();
    let query = ctx.models.first.query;
    expect(query).to.match(/SELECT TOP 1 (.* as a\d+)(, .* as a\d+)* FROM model as (t\d+)/i);
  });
});
