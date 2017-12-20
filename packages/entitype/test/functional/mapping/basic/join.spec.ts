import { expect } from 'chai';
import { container } from 'entitype/src/ioc';
import { mockDriverToReturnDataWithoutAlias } from 'entitype/test/mock';

import { Context } from './entity/Context';

describe('entitype > mapping > join', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());

  it('should be able to map explicitly joined tables from the owning side', async () => {
    let specName = 'my-name';
    let specId = 5;
    let specChildId = 15;
    let childId = 52;
    let childName = 'childName';

    let dataResult = [{ name: specName, id: specId, child_id: specChildId, child: { id: 52, name: childName } }];


    mockDriverToReturnDataWithoutAlias(dataResult);

    let ctx = new Context();
    let result = await ctx.models.select(x => ({
      mappedName: x.name,
      mappedId: x.id,
      mappedChild: { mappedId: x.child_id },
      child: {
        id: x.child.id,
        name: x.child.name
      }
    })).first();

    expect(result.mappedName).to.be.equal(specName);
    expect(result.mappedId).to.be.equal(specId);
    expect(result.mappedChild.mappedId).to.be.equal(specChildId);
    expect(result.child.id).to.be.equal(childId);
    expect(result.child.name).to.be.equal(childName);
  });


  it('should be able to map implicitly joined tables from the owning side', async () => {
    let specName = 'my-name';
    let specId = 5;
    let specChildId = 15;
    let childId = 52;
    let childName = 'childName';

    let dataResult = [{ name: specName, id: specId, child_id: specChildId, child: { id: 52, name: childName } }];


    mockDriverToReturnDataWithoutAlias(dataResult);

    let ctx = new Context();
    let result = await ctx.models.select(x => ({
      mappedName: x.name,
      mappedId: x.id,
      mappedChild: { mappedId: x.child_id },
      child: x.child
    })).first();

    expect(result.mappedName).to.be.equal(specName);
    expect(result.mappedId).to.be.equal(specId);
    expect(result.mappedChild.mappedId).to.be.equal(specChildId);
    expect(result.child.id).to.be.equal(childId);
    expect(result.child.name).to.be.equal(childName);
  });


  it('should be able to map explicitly joined tables from the owned side', async () => {
    let dataResult = {
      name: 'other-name',
      id: 51,
      parent: {
        id: 52,
        name: 'parent-name'
      }
    };


    mockDriverToReturnDataWithoutAlias([dataResult]);

    let ctx = new Context();
    let result = await ctx.othermodels.select(x => ({
      mappedName: x.name,
      mappedId: x.id,
      parent: {
        id: x.parent.id,
        name: x.parent.name
      }
    })).first();

    expect(result.mappedName).to.be.equal(dataResult.name);
    expect(result.mappedId).to.be.equal(dataResult.id);
    expect(result.parent.id).to.be.equal(dataResult.parent.id);
    expect(result.parent.name).to.be.equal(dataResult.parent.name);
  });


  it('should be able to map implicitly joined tables from the owned side', async () => {
    let dataResult = {
      name: 'other-name',
      id: 51,
      parent: {
        id: 52,
        name: 'parent-name'
      }
    };


    mockDriverToReturnDataWithoutAlias([dataResult]);

    let ctx = new Context();
    let result = await ctx.othermodels.select(x => ({
      mappedName: x.name,
      mappedId: x.id,
      parent: x.parent
    })).first();

    expect(result.mappedName).to.be.equal(dataResult.name);
    expect(result.mappedId).to.be.equal(dataResult.id);
    expect(result.parent.id).to.be.equal(dataResult.parent.id);
    expect(result.parent.name).to.be.equal(dataResult.parent.name);
  });


  it('should be able to map included tables from the owning side', async () => {
    let specName = 'my-name';
    let specId = 5;
    let specChildId = 15;
    let childId = 52;
    let childName = 'childName';

    let dataResult = [{ name: specName, id: specId, child_id: specChildId, child: { id: 52, name: childName } }];


    mockDriverToReturnDataWithoutAlias(dataResult);

    let ctx = new Context();
    let result = await ctx.models.include(x => x.child).first();

    expect(result.name).to.be.equal(specName);
    expect(result.id).to.be.equal(specId);
    expect(result.child_id).to.be.equal(specChildId);
    expect(result.child.id).to.be.equal(childId);
    expect(result.child.name).to.be.equal(childName);
  });

  it('should return null child if child does not exist on join', async () => {
    let specName = 'my-name';
    let specId = 5;
    let specChildId = null;
    let childId = specChildId;
    let childName = null;

    let dataResult = [{ name: specName, id: specId, child_id: specChildId, child: { id: childId, name: childName } }];


    mockDriverToReturnDataWithoutAlias(dataResult);

    let ctx = new Context();
    let result = await ctx.models.select(x => ({
      mappedName: x.name,
      mappedId: x.id,
      mappedChild: { mappedId: x.child_id },
      child: x.child
    })).first();

    expect(result.mappedName).to.be.equal(specName);
    expect(result.mappedId).to.be.equal(specId);
    expect(result.mappedChild.mappedId).to.be.equal(specChildId);
    expect(result.child).to.be.equal(null);
  });


  it('should return null child properties if child does not exist on explicit join', async () => {
    let specName = 'my-name';
    let specId = 5;
    let specChildId = null;
    let childId = specChildId;
    let childName = null;

    let dataResult = [{ name: specName, id: specId, child_id: specChildId, child: { id: childId, name: childName } }];


    mockDriverToReturnDataWithoutAlias(dataResult);

    let ctx = new Context();
    let result = await ctx.models.select(x => ({
      mappedName: x.name,
      mappedId: x.id,
      mappedChild: { mappedId: x.child_id },
      childName: (x.child || {})['name']
    })).first();

    expect(result.mappedName).to.be.equal(specName);
    expect(result.mappedId).to.be.equal(specId);
    expect(result.mappedChild.mappedId).to.be.equal(specChildId);
    expect(result.childName).to.not.exist;
  });
});
