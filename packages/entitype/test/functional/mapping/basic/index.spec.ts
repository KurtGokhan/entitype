import { useConfiguration, ConnectionOptions } from 'src/configuration';
import { mockDriverToReturnData } from 'test/mock/driver-mock';
import { container } from 'src/ioc';
import { Context } from './entity/Context';
import { expect } from 'chai';

describe('mapping > basic', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());

  let mockConfig: ConnectionOptions = {
    adapter: 'mock'
  };

  it('should be able to get single scalar data', async () => {
    let specName = 'my-name';
    let dataResult = [{ a1: specName }];

    useConfiguration(mockConfig);
    mockDriverToReturnData(dataResult);

    let ctx = new Context();
    let name = await ctx.models.select(x => x.name).first();

    expect(name).to.be.equal(specName);
  });

  it('should be able to get list of scalar data', async () => {
    let result = ['my-name', 'my-name-2', 'my-name-3'];
    let dataResult = [{ a1: result[0] }, { a1: result[1] }, { a1: result[2] }];

    useConfiguration(mockConfig);
    mockDriverToReturnData(dataResult);

    let ctx = new Context();
    let name = await ctx.models.select(x => x.name).toList();

    expect(name).to.be.deep.equal(result);
  });


  it('should be able to get single flat mapped data', async () => {
    let specName = 'my-name';
    let specId = 5;
    let dataResult = [{ a1: specName, a2: specId }];

    useConfiguration(mockConfig);
    mockDriverToReturnData(dataResult);

    let ctx = new Context();
    let result = await ctx.models.select(x => ({ mappedName: x.name, mappedId: x.id })).first();

    expect(result.mappedName).to.be.equal(specName);
    expect(result.mappedId).to.be.equal(specId);
  });

  it('should be able to get list of flat mapped data', async () => {
    let result = [{ mappedName: 'my-name-1', mappedId: 5 }, { mappedName: 'my-name-2', mappedId: 1 }];
    let dataResult = [{ a1: result[0].mappedId, a2: result[0].mappedName }, { a1: result[1].mappedId, a2: result[1].mappedName }];

    useConfiguration(mockConfig);
    mockDriverToReturnData(dataResult);

    let ctx = new Context();
    let results = await ctx.models.select(x => ({ mappedId: x.id, mappedName: x.name })).toList();

    expect(results).to.be.deep.equal(result);
  });

  it('should be able to get single deep mapped data', async () => {
    let specName = 'my-name';
    let specId = 5;
    let specChildId = 15;
    let dataResult = [{ a1: specName, a2: specId, a3: specChildId }];

    useConfiguration(mockConfig);
    mockDriverToReturnData(dataResult);

    let ctx = new Context();
    let result = await ctx.models.select(x => ({
      mappedName: x.name,
      mappedId: x.id,
      mappedChild: { mappedId: x.child_id }
    })).first();

    expect(result.mappedName).to.be.equal(specName);
    expect(result.mappedId).to.be.equal(specId);
    expect(result.mappedChild.mappedId).to.be.equal(specChildId);
  });


  it('should be able to get single map to arrays', async () => {
    let specName = 'my-name';
    let specId = 5;
    let specChildId = 15;
    let dataResult = [{ a1: specName, a2: specId, a3: specChildId }];

    useConfiguration(mockConfig);
    mockDriverToReturnData(dataResult);

    let ctx = new Context();
    let result = await ctx.models.select(x => [x.name, x.id, x.child_id]).first();

    expect(result[0]).to.be.equal(specName);
    expect(result[1]).to.be.equal(specId);
    expect(result[2]).to.be.equal(specChildId);
    expect(result.length).to.be.equal(3);
    expect(Array.isArray(result));
  });

  it('should be able to get single deep map to arrays', async () => {
    let specName = 'my-name';
    let specId = 5;
    let specChildId = 15;
    let dataResult = [{ a1: specName, a2: specId, a3: specChildId }];

    useConfiguration(mockConfig);
    mockDriverToReturnData(dataResult);

    let ctx = new Context();
    let result = await ctx.models.select(x => ({
      mappedArray: [x.name, x.id, x.child_id]
    })).first();

    expect(result.mappedArray[0]).to.be.equal(specName);
    expect(result.mappedArray[1]).to.be.equal(specId);
    expect(result.mappedArray[2]).to.be.equal(specChildId);
    expect(result.mappedArray.length).to.be.equal(3);
    expect(Array.isArray(result.mappedArray));
  });
});
