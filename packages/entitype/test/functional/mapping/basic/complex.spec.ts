import { expect } from 'chai';
import { container } from 'entitype/src/ioc';
import { mockDriverToReturnData } from 'entitype/test/mock';
import { Context } from './entity/Context';

describe('mapping > complex', async () => {
  beforeEach(() => container.snapshot());
  afterEach(() => container.restore());

  it('should be able to get constant valued mappings', async () => {
    let dataResult = [{ a1: 5 }, { a2: 5 }];

    mockDriverToReturnData(dataResult);

    let ctx = new Context();

    let result = await ctx.models.select(x => 5).first();
    expect(result).to.be.equal(5);

    let results = await ctx.models.select(x => 5).toList();
    expect(results).to.be.deep.equal([5, 5]);
  });

  it('should be able to get constant valued deep mappings', async () => {
    let dataResult = [{ a1: 5 }, { a2: 5 }];
    let deepObject = {
      myDeepProperty: { deepValue: 42, deeper: { bradPit: '-.-' } },
      notSoDeepValue: 21,
      shallowString: 'level 1',
      deepArray: [5, '2']
    };

    mockDriverToReturnData(dataResult);

    let ctx = new Context();

    let result = await ctx.models.select(x => deepObject).first();
    expect(result).to.be.deep.equal(deepObject);
    expect(Array.isArray(result.deepArray));
    expect(result.deepArray[0]).to.be.deep.equal(5);
    expect(result.deepArray[1]).to.be.deep.equal('2');

    let results = await ctx.models.select(x => deepObject).toList();
    expect(results).to.be.deep.equal([deepObject, deepObject]);
  });
});
