import { expect } from 'chai';
import { container } from 'src/ioc';
import { ConditionType } from 'src/plugins';
import { mockDriverToReturnData } from 'test/mock';

import { Context } from './entity/Context';

describe('query-context', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());


  it('should be correctly create context in limit statements', async () => {
    mockDriverToReturnData(null, ctx => {
      let take = ctx.take;
      expect(take.amount).to.be.eql(5);
    });

    let ctx = new Context();
    await ctx.models.take(5).toList.query;
  });

  it('should be correctly create context in skip statements', async () => {
    mockDriverToReturnData(null, ctx => {
      let skip = ctx.skip;
      expect(skip.amount).to.be.eql(10);
      expect(ctx.first).to.be.not.null;
      expect(ctx.isQuery).to.be.not.null;
    });

    let ctx = new Context();
    await ctx.models.skip(10).first.query;
  });

  it('should be correctly create context in order statements', async () => {
    mockDriverToReturnData(null, ctx => {
      let [ascOrder, descOrder] = ctx.orders;

      expect(ascOrder.descending).to.be.eql(false);
      expect(ascOrder.propertyPath).to.be.eql(['id']);

      expect(descOrder.descending).to.be.eql(true);
      expect(descOrder.propertyPath).to.be.eql(['child', 'id']);
    });

    let ctx = new Context();
    await ctx.models.orderByAscending(x => x.id).thenByDescending(x => x.child.id).first.query;
  });
  it('should be correctly create context in where statements', async () => {
    mockDriverToReturnData(null, ctx => {
      let wheres = ctx.wheres;
      let [group1, group2] = ctx.whereGroups;
      let [whereGt5, whereLt10] = group1;
      let [whereNameEquals, whereOtherNameNotNull] = group2;

      expect(wheres.length).to.be.equal(4);

      expect(whereGt5.parameters).to.be.eql([5]);
      expect(whereLt10.parameters).to.be.eql([10]);
      expect(whereNameEquals.parameters).to.be.eql(['Model 3']);
      expect(whereOtherNameNotNull.parameters).to.be.eql([]);

      expect(whereGt5.conditionType).to.be.eql(ConditionType.GreaterThan);
      expect(whereLt10.conditionType).to.be.eql(ConditionType.LessThanOrEqual);
      expect(whereNameEquals.conditionType).to.be.eql(ConditionType.Equals);
      expect(whereOtherNameNotNull.conditionType).to.be.eql(ConditionType.IsNull);

      expect(whereGt5.negated).to.be.eql(false);
      expect(whereLt10.negated).to.be.eql(false);
      expect(whereNameEquals.negated).to.be.eql(false);
      expect(whereOtherNameNotNull.negated).to.be.eql(true);

      expect(whereGt5.propertyPath).to.be.eql(['id']);
      expect(whereLt10.propertyPath).to.be.eql(['id']);
      expect(whereNameEquals.propertyPath).to.be.eql(['name']);
      expect(whereOtherNameNotNull.propertyPath).to.be.eql(['other', 'name']);
    });

    let ctx = new Context();
    await ctx.models
      .where(x => x.id().gt(5)).andWhere(x => x.id().lte(10))
      .or
      .where(x => x.name().equals('Model 3')).andWhere(x => x.other.name().not.isNull())
      .count.query;
  });
});
