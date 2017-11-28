import { expect } from 'chai';
import { MysqlDriver } from 'entitype-mysql';
import { connectionOptions } from 'test/helper';


describe.skip('types', () => {
  it('', async () => {
    let driver = new MysqlDriver();
    let res = await driver.runQuery('Select * from test', connectionOptions);
    expect(res).not.to.be.null;
  });
});
