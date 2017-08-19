import { DbSet } from 'src/collections/DbSet';
import { Model } from './entity/Model';
import { ChildModel } from './entity/ChildModel';
import { expect } from 'chai';

describe('query > one-to-one > where > join', async () => {

  it('should be able to filter from owned side', async () => {
    let ctx = new DbSet(Model);
    let loadModelQuery = ctx
      .where(x => x.child.asEntity().name.equals('childname'))
      .select(x => x.name)
      .toList.query;

    expect(loadModelQuery).to.be.equalIgnoreSpaces(
      `SELECT name FROM Model LEFT JOIN
       ChildModel ON ChildModel.parent_id = Model.id WHERE
       ( ( ChildModel.name = 'childname' ) )`);
  });
});
