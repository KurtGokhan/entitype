import { expect } from 'chai';
import { Context } from './entity/Context';

describe('query > escape', async () => {

  it('should escape filter parameters', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.where(x => x.name).equals(' % name \' " ').select(x => 5).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT null FROM model as t0 WHERE ( ( t0.name = ' \\% name \\' \\" ' ) )`);
  });

  it('should escape ignore percentage symbol in like', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.where(x => x.name).like(' % name \' " ').select(x => 5).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT null FROM model as t0 WHERE ( ( t0.name LIKE ' % name \\' \\" ' ) )`);
  });


  it('should be able to query short date', async () => {
    let ctx = new Context();
    let date = new Date(Date.UTC(1990, 6, 6));
    let loadModelQuery = ctx.models.where(x => x.createdDate).gt(date).select(x => 5).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT null FROM model as t0 WHERE ( ( t0.createdDate > '1990-07-06 00:00:00' ) )`);
  });

  it('should be able to query long date', async () => {
    let ctx = new Context();
    let date = new Date(Date.UTC(1990, 6, 6, 23, 58, 24));
    let loadModelQuery = ctx.models.where(x => x.createdDate).gt(date).select(x => 5).toList.query;
    expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT null FROM model as t0 WHERE ( ( t0.createdDate > '1990-07-06 23:58:24' ) )`);
  });
});
