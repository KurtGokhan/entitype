import { expect } from 'chai';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(adapterName: string, setupConfiguration: () => void, mockDriver?: MockDriverFunction) {

  describe(`${adapterName} > query > where > comparison`, async () => {
    beforeEach(setupConfiguration);

    it('should be able to filter with lessThan', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.id).lessThan(5)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*t0.id < 5.*/i);
    });

    it('should be able to filter with not lessThan', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.id).not.lessThan(5)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*NOT t0.id < 5.*/i);
    });

    it('should be able to filter with lessThanOrEqual', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.id).lessThanOrEqual(5)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*t0.id <= 5.*/i);
    });

    it('should be able to filter with greaterThan', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.id).greaterThan(5)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*t0.id > 5.*/i);
    });

    it('should be able to filter with greaterThanOrEqual', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.id).greaterThanOrEqual(5)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*t0.id >= 5.*/i);
    });

    it('should be able to filter with between', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.id).between(5, 10)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*t0.id BETWEEN 5 AND 10.*/i);
    });

    it('should be able to filter with not between', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.id).not.between(5, 10)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*NOT t0.id BETWEEN 5 AND 10.*/i);
    });
  });
}
