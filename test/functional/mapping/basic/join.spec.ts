import { useConfiguration, ConnectionOptions } from 'src/configuration';
import { mockDriverToReturnData } from 'test/mock/driver-mock';
import { container } from 'src/ioc';
import { Context } from './entity/Context';
import { expect } from 'chai';

describe('mapping > join', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());

  let mockConfig: ConnectionOptions = {
    adapter: 'mock'
  };

  it('should be able to map explicitly joined tables from the owning side', async () => {
    let specName = 'my-name';
    let specId = 5;
    let specChildId = 15;
    let childId = 52;
    let childName = 'childName';

    let dataResult = [{ a1: specName, a2: specId, a3: specChildId, a5: 52, a6: childName }];

    useConfiguration(mockConfig);
    mockDriverToReturnData(dataResult);

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

    let dataResult = [{ a1: specName, a2: specId, a3: specChildId, a5: 52, a6: childName }];

    useConfiguration(mockConfig);
    mockDriverToReturnData(dataResult);

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
      a1: 'other-name',
      a2: 51,
      a4: 52,
      a5: 'parent-name'
    };

    useConfiguration(mockConfig);
    mockDriverToReturnData([dataResult]);

    let ctx = new Context();
    let result = await ctx.othermodels.select(x => ({
      mappedName: x.name,
      mappedId: x.id,
      parent: {
        id: x.parent.id,
        name: x.parent.name
      }
    })).first();

    expect(result.mappedName).to.be.equal(dataResult.a1);
    expect(result.mappedId).to.be.equal(dataResult.a2);
    expect(result.parent.id).to.be.equal(dataResult.a4);
    expect(result.parent.name).to.be.equal(dataResult.a5);
  });


  it('should be able to map implicitly joined tables from the owned side', async () => {
    let dataResult = {
      a1: 'other-name',
      a2: 51,
      a4: 52,
      a5: 'parent-name'
    };

    useConfiguration(mockConfig);
    mockDriverToReturnData([dataResult]);

    let ctx = new Context();
    let result = await ctx.othermodels.select(x => ({
      mappedName: x.name,
      mappedId: x.id,
      parent: x.parent
    })).first();

    expect(result.mappedName).to.be.equal(dataResult.a1);
    expect(result.mappedId).to.be.equal(dataResult.a2);
    expect(result.parent.id).to.be.equal(dataResult.a4);
    expect(result.parent.name).to.be.equal(dataResult.a5);
  });
});
