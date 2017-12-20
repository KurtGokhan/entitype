import { expect } from 'chai';
import { Context } from './entity/Context';

describe('entitype-websql > query > basic > orderby', async () => {

  it('should be able to order by ascending', async () => {
    let ctx = new Context();
    let query = ctx.models.orderByAscending(x => x.id).toList.query;
    expect(query).to.match(/SELECT .* FROM model as t0 ORDER BY t0.id ASC/i);
  });

  it('should be able to order by descending', async () => {
    let ctx = new Context();
    let query = ctx.models.orderByDescending(x => x.name).toList.query;
    expect(query).to.match(/SELECT .* FROM model as t0 ORDER BY t0.name DESC/i);
  });


  it('should be able to order by desc and asc orders', async () => {
    let ctx = new Context();
    let query = ctx.models.orderByDescending(x => x.id).thenByAscending(x => x.name).toList.query;
    expect(query).to.match(/SELECT .* FROM model as t0 ORDER BY t0.id DESC, t0.name ASC/i);
  });

  it('should be able to order by asc and desc orders', async () => {
    let ctx = new Context();
    let query = ctx.models.orderByAscending(x => x.id).thenByDescending(x => x.name).toList.query;
    expect(query).to.match(/SELECT .* FROM model as t0 ORDER BY t0.id ASC, t0.name DESC/i);
  });
});
