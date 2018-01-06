import { expect } from 'chai';
import { container } from 'entitype/dist/plugins';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(adapterName: string, setupConfiguration: () => void, mockDriver?: MockDriverFunction) {
  describe.skip(`${adapterName} > query > edit`, async () => {
    beforeEach(setupConfiguration);
    beforeEach(() => container.snapshot());
    afterEach(() => container.restore());


    it('should be able to insert', async () => {
      mockDriver((query) => {
        expect(query).to.match(/INSERT into Customers \(id, firstName\) VALUES \(\?,\?\) /i);
      });

      let entry = new nw.Customer();
      entry.id = 5;
      entry.firstName = 'Entry1';

      let ctx = new nw.NorthwindContext();
      ctx.customers.insert(entry);
    });


    it('should be able to persist', async () => {
      mockDriver((query) => {
        expect(query).to.match(/INSERT into Model \(id, name\) VALUES \(\?,\?\) ON DUPLICATE KEY UPDATE id = VALUES\(id\), name = VALUES\(name\)/i);
      });

      let entry = new nw.Customer();
      entry.id = 5;
      entry.firstName = 'Entry1';

      let ctx = new nw.NorthwindContext();
      ctx.customers.insert(entry);
    });

    it('should be able to update', async () => {
      mockDriver((query) => {
        expect(query).to.match(/UPDATE Model SET name = \? WHERE id = 5/i);
      });

      let entry = new nw.Customer();
      entry.id = 5;
      entry.firstName = 'Entry1';

      let ctx = new nw.NorthwindContext();
      ctx.customers.update(entry);
    });
  });
}
