import { expect } from 'chai';
import { Context } from './entity/Context';

describe('query > one-to-one > basic', async () => {

  it('should be able to select from owning side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.include(x => x.child).select(x => x.name).toList.query;
    expect(loadModelQuery).to
      .match(/SELECT .* FROM model as t0 LEFT JOIN childmodel as t\d+ ON t0.child_id = t\d+.id/i);
  });

  it('should be able to explicitly include child', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.include(x => x.child).toList.query;
    expect(loadModelQuery).to
      .equal(`SELECT t0.id as a1, t2.id as a3, t0.name as a4, t0.child_id as a5, t2.name as a6`
      + ` FROM Model as t0 LEFT JOIN ChildModel as t2 ON t0.child_id = t2.id`);
  });


  it('should be able to implicitly include whole child', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.select(x => x.child).toList.query;
    expect(loadModelQuery).to
      .equal(`SELECT t0.id as a1, t2.id as a3, t2.name as a4`
      + ` FROM Model as t0 LEFT JOIN ChildModel as t2 ON t0.child_id = t2.id`);
  });

  it('should be able to implicitly include child partially', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.select(x => x.child.name).toList.query;
    expect(loadModelQuery).to
      .equal(`SELECT t0.id as a1, t2.id as a3, t2.name as a4 FROM Model as t0 LEFT JOIN ChildModel as t2 ON t0.child_id = t2.id`);
  });

  it('should be able to implicitly include child and parent partially', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models.select(x => [x.child.name, x.name]).toList.query;
    expect(loadModelQuery).to
      .equal(`SELECT t0.id as a1, t2.id as a3, t2.name as a4, t0.name as a5`
      + ` FROM Model as t0 LEFT JOIN ChildModel as t2 ON t0.child_id = t2.id`);
  });
});
