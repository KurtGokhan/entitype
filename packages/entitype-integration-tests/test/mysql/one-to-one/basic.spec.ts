import { expect } from 'chai';
import { Context } from '../config/entities/Context';
import { integrationTestDatabaseSeed } from '../integration-helper';

describe('query > one-to-one > basic', async () => {
  beforeEach(integrationTestDatabaseSeed);

  it('should be able to select owning side property from owning side', async () => {
    let ctx = new Context();
    let names = await ctx.models.select(x => x.name).toList();
    expect(names).not.to.be.equal(null);
    expect(names.length).to.be.equal(3);
    expect(names[0]).to.be.equal('Model 1');
  });


  it('should be able to select owned side included implicitly', async () => {
    let ctx = new Context();
    let children = await ctx.models.select(x => x.child).toList();

    expect(children).not.to.be.equal(null);
    expect(children.length).to.be.equal(3);
    expect(children[0].name).to.be.equal('Child Model 1');
  });

  it('should be able to select owned side property from owning side included implicitly', async () => {
    let ctx = new Context();
    let childNames = await ctx.models.select(x => (x.child || {} as any).name).toList();

    expect(childNames).not.to.be.equal(null);
    expect(childNames.length).to.be.equal(3);
    expect(childNames[0]).to.be.equal('Child Model 1');
  });

  it('should be able to filter based on whether the child is null', async () => {
    let ctx = new Context();
    let childNames = await ctx.models
      .where(x => x.child).not.isNull()
      .select(x => x.child.name)
      .toList();

    expect(childNames).not.to.be.equal(null);
    expect(childNames.length).to.be.equal(2);
    expect(childNames[0]).to.be.equal('Child Model 1');
  });

  it('should be able to filter based on whether the child property is null', async () => {
    let ctx = new Context();
    let childNames = await ctx.models.where(x => x.child.id).not.isNull().select(x => x.child.name).toList();

    expect(childNames).not.to.be.equal(null);
    expect(childNames.length).to.be.equal(2);
    expect(childNames[0]).to.be.equal('Child Model 1');
  });

  it('should be able to select all relation included explicitly', async () => {
    let ctx = new Context();
    let models = await ctx.models.include(x => x.child).toList();

    expect(models).not.to.be.equal(null);
    expect(models.length).to.be.equal(3);
    expect(models[0].child).not.to.be.equal(null);
    expect(models[0].name).to.be.equal('Model 1');
    expect(models[0].child.name).to.be.equal('Child Model 1');
  });


  it('should return null for owned side if not found', async () => {
    let ctx = new Context();
    let model = await ctx.models.include(x => x.child).where(x => x.id).equals(2).first();

    expect(model).not.to.be.equal(null);
    expect(model.child).to.be.equal(null);
  });
});
