import { expect } from 'chai';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(adapterName: string, setupConfiguration: () => void, mockDriver?: MockDriverFunction) {

  describe(`${adapterName} > query > where > with count`, async () => {
    beforeEach(setupConfiguration);

    it('should be able to filter selection and take count', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.productName).isNull()
        .count.query;
      expect(query).to.satisfySql(`SELECT Count(*) as count FROM products as t0 WHERE ( ( t0.product_name IS NULL ) )`);
    });

    it('should be able to filter selection with not and take count', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.productName).not.isNull()
        .count.query;
      expect(query).to.satisfySql(`SELECT Count(*) as count FROM products as t0 WHERE ( ( NOT t0.product_name IS NULL ) )`);
    });
  });
}
