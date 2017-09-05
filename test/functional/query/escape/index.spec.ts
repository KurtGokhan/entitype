import { Context } from './entity/Context';
import { expect } from 'chai';

describe('query > escape', async () => {

  it('should escape filter parameters', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.where(x => x.name().equals(' % name \' " ')).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( name = ' \\% name \\' \\" ' ) )`);
  });

  it('should escape ignore percentage symbol in like', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.where(x => x.name().like(' % name \' " ')).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( name LIKE ' % name \\' \\" ' ) )`);
  });


  it('should be able to query short date', async () => {
    let ctx = new Context();
    let date = new Date(Date.UTC(1990, 6, 6));
    let loadModelQuery = ctx.models.where(x => x.createdDate().gt(date)).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( createdDate > '1990-07-06 00:00:00' ) )`);
  });

  it('should be able to query long date', async () => {
    let ctx = new Context();
    let date = new Date(Date.UTC(1990, 6, 6, 23, 58, 24));
    let loadModelQuery = ctx.models.where(x => x.createdDate().gt(date)).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT * FROM model as t0 WHERE ( ( createdDate > '1990-07-06 23:58:24' ) )`);
  });
});
