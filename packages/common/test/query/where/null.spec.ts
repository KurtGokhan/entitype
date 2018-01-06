import { expect } from 'chai';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(adapterName: string, setupConfiguration: () => void, mockDriver?: MockDriverFunction) {
  describe(`${adapterName} > query > where > null`, async () => {
    beforeEach(setupConfiguration);

    it('should be able to filter selection where null', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.productName).isNull()
        .toList.query;
      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*t0.product_name IS NULL.*/i);
    });

    it('should be able to filter selection where not null', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.productName).not.isNull()
        .toList.query;
      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*NOT t0.product_name IS NULL.*/i);
    });
  });
}
