import { expect } from 'chai';
import { integrationTestDatabaseSeed } from '../../northwind/helper';

import * as nw from 'commonmywind';

describe('entitype-integration-tests > query > many-to-many > basic', async () => {
  beforeEach(integrationTestDatabaseSeed);

  it('should be able to select all of right model from left side', async () => {
    let ctx = new nw.NorthwindContext();
    let privileges = await ctx.employees.select(x => x.employeePrivileges).toList();
    expect(privileges).not.to.be.null;
    expect(privileges.length).to.equal(9);
    expect(privileges[0].length).to.eql(1);
    expect(privileges[0][0]).to.eql({ id: 2, privilegeName: 'Purchase Approvals' });
  });

  it('should be able to select some of right model properties from left side', async () => {
    let ctx = new nw.NorthwindContext();
    let privileges = await ctx.employees.select(x => x.employeePrivileges.map(x => x.privilegeName)).toList();
    expect(privileges).not.to.be.null;
    expect(privileges.length).to.equal(9);
    expect(privileges[0].length).to.eql(1);
    expect(privileges[0][0]).to.eql('Purchase Approvals');
  });

  it('should be able to select some of left model properties from right side', async () => {
    let ctx = new nw.NorthwindContext();
    let privileges = await ctx.privileges.select(x => x.employeePrivileges.map(x => x.address)).toList();
    expect(privileges).not.to.be.null;
    expect(privileges.length).to.equal(1);
    expect(privileges[0].length).to.eql(1);
    expect(privileges[0][0]).to.eql('123 2nd Avenue');
  });
});
