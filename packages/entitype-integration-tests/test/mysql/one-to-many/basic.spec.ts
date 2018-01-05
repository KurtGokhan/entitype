import { expect } from 'chai';
import { integrationTestDatabaseSeed } from '../../northwind/helper';

import * as nw from 'examples/mywind';

describe('entitype-integration-tests > query > one-to-many > basic', async () => {
  beforeEach(integrationTestDatabaseSeed);

  it('should be able to select all of right model and its included properties from left side', async () => {
    let ctx = new nw.NorthwindContext();
    let details = await ctx.orders
      .include(x => x.orderDetails.map(y => y.product))
      .select(x => x.orderDetails).toList();
    expect(details).not.to.be.null;
    expect(details.length).to.equal(48);
    expect(details[0].length).to.eql(2);
    expect(details[0][0].quantity).to.eql('100.0000');
    expect(details[0][0].product).not.to.be.null;
    expect(details[0][0].product.id).to.eql(34);
  });
});
