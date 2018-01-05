import { expect } from 'chai';
import { multilineRegExp } from '~/test/util';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(setupConfiguration: () => void, mockDriver?: MockDriverFunction) {
  describe('entitype-mysql > entitype > query > many-to-many > basic', async () => {
    beforeEach(setupConfiguration);

    it('should be able to select basic', async () => {
      let ctx = new nw.NorthwindContext();
      let loadModelQuery = ctx.employees.include(x => x.employeePrivileges).select(x => x.firstName).toList.query;
      expect(loadModelQuery).to
        .match(multilineRegExp([
          /SELECT .* FROM employees as t0 /,
          /LEFT JOIN employeeprivileges as m\d+ ON m\d+.employeeId = t0.id /,
          /LEFT JOIN privileges as t\d+ ON m\d+.privilegeId = t\d+.id/i
        ], 'i'));
    });
  });
}
