import { expect } from 'chai';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(adapterName: string, setupConfiguration: () => void, mockDriver?: MockDriverFunction) {

  describe(`${adapterName} > query > where > like`, async () => {
    beforeEach(setupConfiguration);

    it('should be able to filter selection', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.productName).like('%name%')
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*t0.product_name like '%name%'.*/i);
    });

    it('should be able to filter selection with not', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.productName).not.like('%name%')
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*NOT t0.product_name like '%name%'.*/i);
    });
  });
}
