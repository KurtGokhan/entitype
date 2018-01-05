import { expect } from 'chai';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(setupConfiguration: () => void, mockDriver?: MockDriverFunction) {
  describe('entitype-mysql > query > escape', async () => {
    beforeEach(setupConfiguration);

    it('should escape filter parameters', async () => {
      let ctx = new nw.NorthwindContext();
      let loadModelQuery = ctx.customers.where(x => x.firstName).equals(' % name \' " ').select(x => 5).toList.query;
      expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT null FROM customers as t0 WHERE ( ( t0.firstName = ' \\% name \\' \\" ' ) )`);
    });

    it('should escape ignore percentage symbol in like', async () => {
      let ctx = new nw.NorthwindContext();
      let loadModelQuery = ctx.customers.where(x => x.firstName).like(' % name \' " ').select(x => 5).toList.query;
      expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT null FROM customers as t0 WHERE ( ( t0.firstName LIKE ' % name \\' \\" ' ) )`);
    });


    it('should be able to query short date', async () => {
      let ctx = new nw.NorthwindContext();
      let date = new Date(Date.UTC(1990, 6, 6));
      let loadModelQuery = ctx.orderDetails.where(x => x.dateAllocated).greaterThan(date).select(x => 5).toList.query;
      expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT null FROM orderDetails as t0 WHERE ( ( t0.dateAllocated > '1990-07-06 00:00:00' ) )`);
    });

    it('should be able to query long date', async () => {
      let ctx = new nw.NorthwindContext();
      let date = new Date(Date.UTC(1990, 6, 6, 23, 58, 24));
      let loadModelQuery = ctx.orderDetails.where(x => x.dateAllocated).greaterThan(date).select(x => 5).toList.query;
      expect(loadModelQuery).to.be.equalIgnoreCase(`SELECT null FROM orderDetails as t0 WHERE ( ( t0.dateAllocated > '1990-07-06 23:58:24' ) )`);
    });
  });
}
