import { expect } from 'chai';
import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(adapterName: string, setupConfiguration: () => void, mockDriver?: MockDriverFunction) {
  describe(`${adapterName} > query > where > boolean`, async () => {
    beforeEach(setupConfiguration);

    it('should be able to filter by true boolean columns', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.discontinued).equals(true)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*t0.discontinued = 1.*/i);
    });

    it('should be able to filter by false boolean columns', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.discontinued).equals(false)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*t0.discontinued = 0.*/i);
    });
  });
}
