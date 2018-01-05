import { expect } from 'chai';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(setupConfiguration: () => void, mockDriver?: MockDriverFunction) {

  describe('entitype-mysql > query > basic > orderby', async () => {
    beforeEach(setupConfiguration);

    it('should be able to order by ascending', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers.orderByAscending(x => x.id).toList.query;
      expect(query).to.match(/SELECT .* FROM customers as t0 ORDER BY t0.id ASC/i);
    });

    it('should be able to order by descending', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers.orderByDescending(x => x.firstName).toList.query;
      expect(query).to.match(/SELECT .* FROM customers as t0 ORDER BY t0.first_name DESC/i);
    });


    it('should be able to order by desc and asc orders', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers.orderByDescending(x => x.id).thenByAscending(x => x.firstName).toList.query;
      expect(query).to.match(/SELECT .* FROM customers as t0 ORDER BY t0.id DESC, t0.first_name ASC/i);
    });

    it('should be able to order by asc and desc orders', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers.orderByAscending(x => x.id).thenByDescending(x => x.firstName).toList.query;
      expect(query).to.match(/SELECT .* FROM customers as t0 ORDER BY t0.id ASC, t0.first_name DESC/i);
    });
  });
}
