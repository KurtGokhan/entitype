import { expect } from 'chai';

import { NorthwindContext } from 'common/northwind-sqlite';
import { seedWebsqlDatabase } from './helper';

describe('entitype-integration-tests > query > one-to-one > basic', async () => {
  beforeEach(async function () {
    this.timeout(20000);
    await seedWebsqlDatabase();
  });

  it('should be able to select owning side property from owning side', async () => {
    let ctx = new NorthwindContext();
    let names = await ctx.orders.select(x => x.shipName).toList();
    expect(names).not.to.be.equal(null);
    expect(names.length).to.be.equal(67);
    expect(names[0]).to.be.equal('Vins et alcools Chevalier');
  });


  it('should be able to select owned side included implicitly', async () => {
    let ctx = new NorthwindContext();
    let children = await ctx.orders.select(x => x.orderDetailsReference).toList();

    expect(children).not.to.be.equal(null);
    expect(children.length).to.be.equal(67);
    expect(children[0].unitPrice).to.be.equal(34.8);
  });

  it('should be able to select owned side property from owning side included implicitly', async () => {
    let ctx = new NorthwindContext();
    let childNames = await ctx.orders.select(x => (x.orderDetailsReference || {} as any).unitPrice).toList();

    expect(childNames).not.to.be.equal(null);
    expect(childNames.length).to.be.equal(67);
    expect(childNames[0]).to.be.equal(34.8);
  });

  it('should be able to filter based on whether the child is null', async () => {
    let ctx = new NorthwindContext();
    let childNames = await ctx.orders
      .where(x => x.orderDetailsReference).not.isNull()
      .select(x => x.orderDetailsReference.unitPrice)
      .toList();

    expect(childNames).not.to.be.equal(null);
    expect(childNames.length).to.be.equal(10);
    expect(childNames[0]).to.be.equal(34.8);
  });

  it('should be able to filter based on whether the child property is null', async () => {
    let ctx = new NorthwindContext();
    let childNames = await ctx.orders
      .where(x => x.orderDetailsReference.orderId).not.isNull()
      .select(x => x.orderDetailsReference.unitPrice)
      .toList();

    expect(childNames).not.to.be.equal(null);
    expect(childNames.length).to.be.equal(10);
    expect(childNames[0]).to.be.equal(34.8);
  });

  it('should be able to select all relation included explicitly', async () => {
    let ctx = new NorthwindContext();
    let models = await ctx.orders.include(x => x.orderDetailsReference).toList();

    expect(models).not.to.be.equal(null);
    expect(models.length).to.be.equal(67);
    expect(models[0].orderDetailsReference).not.to.be.equal(null);
    expect(models[0].shipName).to.be.equal('Vins et alcools Chevalier');
    expect(models[0].orderDetailsReference.unitPrice).to.be.equal(34.8);
  });


  it('should return null for owned side if not found', async () => {
    let ctx = new NorthwindContext();
    let model = await ctx.orders
      .include(x => x.orderDetailsReference)
      .where(x => x.orderId).equals(10258)
      .first();

    expect(model).not.to.be.equal(null);
    expect(model.orderDetailsReference).to.be.equal(null);
  });
});
