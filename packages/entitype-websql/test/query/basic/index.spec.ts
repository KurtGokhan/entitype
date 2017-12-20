import { expect } from 'chai';
import { Context } from './entity/Context';

describe('entitype-websql > query > basic', async () => {

  it('should be able to select all', async () => {
    let ctx = new Context();
    let query = ctx.models.toList.query;
    expect(query).to.match(/SELECT (.* as a\d+)(, .* as a\d+)* FROM model as t0/i);
  });

  it('should be able to select with custom table name', async () => {
    let ctx = new Context();
    let query = ctx.othermodels.toList.query;
    expect(query).to.match(/SELECT (.* as a\d+)(, .* as a\d+)* FROM other as t0/i);
  });

  it('should be able to select single column as scalar', async () => {
    let ctx = new Context();
    let query = ctx.models
      .select(x => x.id)
      .toList
      .query;
    expect(query).to.match(/SELECT t0.id as (a\d+) FROM model as t0/i);
  });

  it('should be able to select specific columns with aliases', async () => {
    let ctx = new Context();
    let query = ctx.models
      .select(x => ({ nameAlias: x.name, idAlias: x.id }))
      .toList
      .query;
    expect(query).to.be.equalIgnoreCase('SELECT t0.name as a1, t0.id as a2 FROM model as t0');
  });

  it('should be able to limit selection', async () => {
    let ctx = new Context();
    let query = ctx.models
      .select(x => ({ nameAlias: x.name, idAlias: x.id }))
      .take(5)
      .toList
      .query;
    expect(query).to.be.equalIgnoreCase('SELECT t0.name as a1, t0.id as a2 FROM model as t0 LIMIT 5');
  });

  it('should be able to limit and offset selection', async () => {
    let ctx = new Context();
    let query = ctx.models
      .select(x => ({ nameAlias: x.name, idAlias: x.id }))
      .skip(10)
      .take(5)
      .toList
      .query;
    expect(query).to.be.equalIgnoreCase('SELECT t0.name as a1, t0.id as a2 FROM model as t0 LIMIT 5 OFFSET 10');
  });

  it('should be able to query count', async () => {
    let ctx = new Context();
    let query = ctx.models.count.query;
    expect(query).to.be.equalIgnoreCase('SELECT COUNT(*) as count FROM model as t0');
  });


  it('should be able to query first', async () => {
    let ctx = new Context();
    let query = ctx.models.first.query;
    expect(query).to.match(/SELECT .* FROM model as (t\d+) LIMIT 1/i);
  });

  it('should be able to query first after offset', async () => {
    let ctx = new Context();
    let query = ctx.models.skip(5).first.query;
    expect(query).to.match(/SELECT .* FROM model as (t\d+) LIMIT 1/i);
  });
});
