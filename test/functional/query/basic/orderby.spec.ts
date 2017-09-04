import { Context } from './entity/Context';
import { Model } from './entity/Model';
import { expect } from 'chai';

describe('query > basic > orderby', async () => {

  it('should be able to order by ascending', async () => {
    let ctx = new Context();
    let query = ctx.models.orderByAscending(x => x.id).toList.query;
    expect(query).to.match(/SELECT .* FROM model as t1 ORDER BY t1.id ASC/);
  });

  it('should be able to order by descending', async () => {
    let ctx = new Context();
    let query = ctx.models.orderByDescending(x => x.name).toList.query;
    expect(query).to.match(/SELECT .* FROM model as t1 ORDER BY t1.name DESC/i);
  });


  it('should be able to combine orders', async () => {
    let ctx = new Context();
    let query = ctx.models.orderByDescending(x => x.id).thenByAscending(x => x.name).toList.query;
    expect(query).to.match(/SELECT .* FROM model as t1 ORDER BY t1.id DESC, t1.name ASC/i);
  });
});
