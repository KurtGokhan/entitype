import { expect } from 'chai';
import { Context } from './entity/Context';

describe('query > one-to-one > reversed', async () => {

  it('should be able to select from owned side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to.
      match(/SELECT .* FROM model as t0 LEFT JOIN childmodel as t\d+ ON t\d+.parent_id = t0.id/i);
  });

  it('should be able to explicitly include child', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.include(x => x.child).toList.query;
    expect(loadModelQuery).to
      .equal(`SELECT t0.id as a1, t0.name as a2, t3.id as a4, t3.name as a5, t3.parent_id as a6`
      + ` FROM Model as t0 LEFT JOIN ChildModel as t3 ON t3.parent_id = t0.id`);
  });


  it('should be able to implicitly include whole child', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.select(x => x.child).toList.query;
    expect(loadModelQuery).to
      .equal(`SELECT t1.id as a2, t1.name as a3, t1.parent_id as a4`
      + ` FROM Model as t0 LEFT JOIN ChildModel as t1 ON t1.parent_id = t0.id`);
  });

  it('should be able to implicitly include child partially', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.select(x => x.child.name).toList.query;
    expect(loadModelQuery).to
      .equal(`SELECT t1.name as a2`
      + ` FROM Model as t0 LEFT JOIN ChildModel as t1 ON t1.parent_id = t0.id`);
  });

  it('should be able to implicitly include child and parent partially', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.select(x => [x.child.name, x.name]).toList.query;
    expect(loadModelQuery).to
      .equal(`SELECT t1.name as a2, t0.name as a3`
      + ` FROM Model as t0 LEFT JOIN ChildModel as t1 ON t1.parent_id = t0.id`);
  });
});
