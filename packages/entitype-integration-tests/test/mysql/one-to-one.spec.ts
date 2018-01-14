import { expect } from 'chai';
import { integrationTestDatabaseSeed } from '../northwind/helper';

import * as nw from 'common/mywind';

describe('entitype-integration-tests > query > one-to-one > basic', async () => {
  beforeEach(integrationTestDatabaseSeed);

  it('should be able to select owning side property from owning side', async () => {
    let ctx = new nw.NorthwindContext();
    let names = await ctx.orders.select(x => x.shipName).toList();
    expect(names).not.to.be.equal(null);
    expect(names.length).to.be.equal(48);
    expect(names[0]).to.be.equal('Karen Toh');
  });


  it('should be able to select owned side included implicitly', async () => {
    let ctx = new nw.NorthwindContext();
    let children = await ctx.orders.select(x => x.orderDetails).toList();

    expect(children).not.to.be.equal(null);
    expect(children.length).to.be.equal(48);
    expect(children[0].unitPrice).to.be.equal('3.5000');
  });

  it('should be able to select owned side property from owning side included implicitly', async () => {
    let ctx = new nw.NorthwindContext();
    let childNames = await ctx.orders.select(x => (x.orderDetails || {} as any).unitPrice).toList();

    expect(childNames).not.to.be.equal(null);
    expect(childNames.length).to.be.equal(48);
    expect(childNames[0]).to.be.equal('3.5000');
  });

  it('should be able to filter based on whether the child is null', async () => {
    let ctx = new nw.NorthwindContext();
    let childNames = await ctx.orders
      .where(x => x.orderDetails).not.isNull()
      .select(x => x.orderDetails.unitPrice)
      .toList();

    expect(childNames).not.to.be.equal(null);
    expect(childNames.length).to.be.equal(40);
    expect(childNames[0]).to.be.equal('3.5000');
  });

  it('should be able to filter based on whether the child property is null', async () => {
    let ctx = new nw.NorthwindContext();
    let childNames = await ctx.orders.where(x => x.orderDetails.id).not.isNull().select(x => x.orderDetails.unitPrice).toList();

    expect(childNames).not.to.be.equal(null);
    expect(childNames.length).to.be.equal(40);
    expect(childNames[0]).to.be.equal('3.5000');
  });

  it('should be able to select all relation included explicitly', async () => {
    let ctx = new nw.NorthwindContext();
    let models = await ctx.orders.include(x => x.orderDetails).toList();

    expect(models).not.to.be.equal(null);
    expect(models.length).to.be.equal(48);
    expect(models[0].orderDetails).not.to.be.equal(null);
    expect(models[0].shipName).to.be.equal('Karen Toh');
    expect(models[0].orderDetails.unitPrice).to.be.equal('3.5000');
  });


  it('should return null for owned side if not found', async () => {
    let ctx = new nw.NorthwindContext();
    let model = await ctx.orders
      .include(x => x.orderDetails)
      .where(x => x.id).equals(57)
      .first();

    expect(model).not.to.be.equal(null);
    expect(model.orderDetails).to.be.equal(null);
  });
});
