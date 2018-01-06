import { expect } from 'chai';
import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(setupConfiguration: () => void, mockDriver?: MockDriverFunction) {

  describe('entitype-mysql > query > where > error', async () => {
    beforeEach(setupConfiguration);

    it('should throw when trying to navigate to an unknown property', async () => {
      let ctx = new nw.NorthwindContext();
      expect(() => ctx.products.where(x => x.orderDetails.concat)['gt'](() => 5).count.query).to.throw(Error);
    });
  });
}
