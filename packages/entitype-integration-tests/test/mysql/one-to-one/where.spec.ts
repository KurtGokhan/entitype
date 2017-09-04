import { integrationTestDatabaseSeed } from '../integration-helper';
import { expect } from 'chai';
import { Context } from 'test/integration/config/entities/Context';

describe('query > one-to-one > where', async () => {
  beforeEach(integrationTestDatabaseSeed);

  it('should be able to filter from owned side', async () => {
    let ctx = new Context();
    let loadModelQuery = ctx.models
      .where(x => x.child.name().equals('childname'))
      .select(x => x.name)
      .toList.query;

    expect(loadModelQuery).to.be.equalIgnoreSpaces(
      `SELECT name FROM Model LEFT JOIN
       ChildModel ON ChildModel.parent_id = Model.id WHERE
       ( ( ChildModel.name = 'childname' ) )`);
  });
});
