import { expect } from 'chai';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(setupConfiguration: () => void, mockDriver?: MockDriverFunction) {

  describe('entitype-mysql > query > where > equality', async () => {
    beforeEach(setupConfiguration);

    it('should be able to filter selection', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.id).equals(1)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*t0.id = 1.*/i);
    });

    it('should be able to filter selection with not', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.products
        .where(x => x.id).not.equals(1)
        .toList.query;

      expect(query).to.satisfySql(/SELECT .* FROM products as t0 WHERE .*NOT t0.id = 1.*/i);
    });
  });
}
