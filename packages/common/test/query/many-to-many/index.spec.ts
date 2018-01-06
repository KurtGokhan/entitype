import { expect } from 'chai';

import * as nw from '../../../mywind';

export type MockDriverFunction = (queryCallback?: (query: string) => void) => void;
export function defineTests(adapterName: string, setupConfiguration: () => void, mockDriver?: MockDriverFunction) {
  describe(`${adapterName} > entitype > query > many-to-many > basic`, async () => {
    beforeEach(setupConfiguration);

    it('should be able to select basic', async () => {
      let ctx = new nw.NorthwindContext();
      let loadModelQuery = ctx.employees.include(x => x.employeePrivileges).select(x => x.firstName).toList.query;
      expect(loadModelQuery).to
        .satisfySql([
          /SELECT .* FROM employees as t0 /,
          /LEFT JOIN employee_privileges as m\d+ ON m\d+.employee_id = t0.id /,
          /LEFT JOIN privileges as t\d+ ON m\d+.privilege_id = t\d+.id/i
        ]);
    });
  });
}
