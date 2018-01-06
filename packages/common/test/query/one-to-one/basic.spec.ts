import { expect } from 'chai';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(adapterName: string, setupConfiguration: () => void, mockDriver?: MockDriverFunction) {
  describe(`${adapterName} > query > one-to-one > basic`, async () => {
    beforeEach(setupConfiguration);

    it('should be able to select from owning side', async () => {
      let ctx = new nw.NorthwindContext();
      let loadModelQuery = ctx.orderDetails.include(x => x.order).select(x => x.dateAllocated).toList.query;
      expect(loadModelQuery).to
        .satisfySql(/SELECT .* FROM order_details as t0 LEFT JOIN orders as t\d+ ON t0.order_id = t\d+.id/i);
    });

    it('should be able to explicitly include child', async () => {
      let ctx = new nw.NorthwindContext();
      let loadModelQuery = ctx.orders.include(x => x.orderDetails).toList.query;
      expect(loadModelQuery).to
        .satisfySql(/SELECT (t0\..+ as a\d+(, )?)*(t\d+\..+ as a\d+,?)* FROM orders as t0 LEFT JOIN order_details as t\d+ ON t\d+.order_id = t0.id/);
    });


    it('should be able to implicitly include whole child', async () => {
      let ctx = new nw.NorthwindContext();
      let loadModelQuery = ctx.orders.select(x => x.orderDetails).toList.query;
      expect(loadModelQuery).to
        .satisfySql(/SELECT t0.id as a1, (t2\..* as a\d+(, )?)* FROM orders as t0 LEFT JOIN order_details as t2 ON t2.order_id = t0.id/);
    });

    it('should be able to implicitly include child partially', async () => {
      let ctx = new nw.NorthwindContext();
      let loadModelQuery = ctx.orders.select(x => x.orderDetails.discount).toList.query;
      expect(loadModelQuery).to
        .satisfySql(/SELECT t0.id as a1, t2.id as a3, t2.discount as a4 FROM orders as t0 LEFT JOIN order_details as t2 ON t2.order_id = t0.id/);
    });

    it('should be able to implicitly include child and parent partially', async () => {
      let ctx = new nw.NorthwindContext();
      let loadModelQuery = ctx.orders.select(x => [x.orderDetails.discount, x.notes]).toList.query;
      expect(loadModelQuery).to
        .satisfySql(`SELECT t0.id as a1, t2.id as a3, t2.discount as a4, t0.notes as a5`
        + ` FROM orders as t0 LEFT JOIN order_details as t2 ON t2.order_id = t0.id`);
    });


    it('should be able to filter from owned side', async () => {
      let ctx = new nw.NorthwindContext();
      let loadModelQuery = ctx.orders
        .where(x => x.orderDetails.discount).lessThan(5)
        .select(x => x.notes)
        .toList.query;

      expect(loadModelQuery).to
        .satisfySql(/SELECT .* FROM orders as t0 LEFT JOIN order_details as t\d+ ON t\d+.order_id = t0.id WHERE .*t\d+.discount < 5/i);
    });
  });
}
