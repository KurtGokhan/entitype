import { expect } from 'chai';
import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(setupConfiguration: () => void, mockDriver?: (queryCallback?: (query: string) => void) => void) {
  describe('entitype-mysql > query > basic', async () => {
    beforeEach(setupConfiguration);

    it('should be able to select all', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers.toList.query;
      expect(query).to.match(/SELECT (.* as a\d+)(, .* as a\d+)* FROM customers as t0/i);
    });

    it('should be able to select single column as scalar', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers
        .select(x => x.id)
        .toList
        .query;
      expect(query).to.match(/SELECT t0.id as (a\d+) FROM customers as t0/i);
    });

    it('should be able to select specific columns with aliases', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers
        .select(x => ({ nameAlias: x.firstName, idAlias: x.id }))
        .toList
        .query;
      expect(query).to.be.equalIgnoreCase('SELECT t0.id as a1, t0.first_name as a2 FROM customers as t0');
    });

    it('should be able to limit selection', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers
        .select(x => ({ nameAlias: x.firstName, idAlias: x.id }))
        .take(5)
        .toList
        .query;
      expect(query).to.be.equalIgnoreCase('SELECT t0.id as a1, t0.first_name as a2 FROM customers as t0 LIMIT 5');
    });

    it('should be able to limit and offset selection', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers
        .select(x => ({ nameAlias: x.firstName, idAlias: x.id }))
        .skip(10)
        .take(5)
        .toList
        .query;
      expect(query).to.be.equalIgnoreCase('SELECT t0.id as a1, t0.first_name as a2 FROM customers as t0 LIMIT 5 OFFSET 10');
    });

    it('should be able to query count', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers.count.query;
      expect(query).to.be.equalIgnoreCase('SELECT COUNT(*) as count FROM customers as t0');
    });


    it('should be able to query first', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers.first.query;
      expect(query).to.match(/SELECT .* FROM customers as (t\d+) LIMIT 1/i);
    });

    it('should be able to query first after offset', async () => {
      let ctx = new nw.NorthwindContext();
      let query = ctx.customers.skip(5).first.query;
      expect(query).to.match(/SELECT .* FROM customers as (t\d+) LIMIT 1/i);
    });
  });
}
