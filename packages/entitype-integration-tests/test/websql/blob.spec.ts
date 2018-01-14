import { expect } from 'chai';

import { NorthwindContext } from 'common/northwind-sqlite';
import { seedNorthwindDatabase } from './helper';

describe('entitype-integration-tests > query > websql > blob', async () => {
  beforeEach(async function () {
    this.timeout(10000);
    await seedNorthwindDatabase();
  });

  it('should return Uint8Array for blob type', async () => {
    let ctx = new NorthwindContext();
    let photo = await ctx.employees.select(x => x.photo).first();
    expect(photo).to.be.instanceof(Buffer);
  });

});
