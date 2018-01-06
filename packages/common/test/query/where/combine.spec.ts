import { expect } from 'chai';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(adapterName: string, setupConfiguration: () => void, mockDriver?: MockDriverFunction) {

  describe(`${adapterName} > entitype > query > where > combine`, async () => {
    beforeEach(setupConfiguration);

    it('should be able to combine multiple conditions with and', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.productName).isNull()
        .and.where(x => x.id).between(5, 10)
        .and.where(x => x.id).not.equals(6)
        .toList.query;

      expect(query).to.satisfySql([
        /SELECT .* FROM products as t0 WHERE /,
        /\( \( t0.product_name IS NULL \) AND \( t0.id BETWEEN 5 AND 10 \) AND \( NOT t0.id = 6 \) \)/
      ]);
    });

    it('should be able to combine multiple conditions with or', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.productName).isNull()
        .or
        .where(x => x.id).between(5, 10)
        .toList.query;

      expect(query).to.satisfySql([
        /SELECT .* FROM products as t0 WHERE \( \( t0.product_name IS NULL \) \) OR \( \( t0.id BETWEEN 5 AND 10 \) \)/
      ]);
    });


    it('should be able to combine multiple conditions with and/or', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.productName).isNull()
        .or
        .where(x => x.id).between(5, 10)
        .and.where(x => x.id).not.equals(6)
        .toList.query;

      expect(query).to.satisfySql([
        /SELECT .* FROM products as t0 WHERE \( \( t0.product_name IS NULL \) \) OR \( \( t0.id BETWEEN 5 AND 10 \) AND \( NOT t0.id = 6 \) \)/
      ]);
    });
  });
}
