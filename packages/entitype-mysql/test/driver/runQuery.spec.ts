import { expect, spy } from 'chai';
import * as sinon from 'sinon';
import { MysqlDriver } from 'src';

describe('driver > runQuery', async () => {
  let mock;

  afterEach(() => mock.restore());

  it('should end connection on successful execution', async () => {
    let end = async () => { };
    let connection = { query: async () => [], end };
    let endSpy = spy.on(connection, 'end');


    mock = sinon.mock(require('mysql2/promise'));
    mock.expects('createConnection').returns(Promise.resolve(connection));

    await new MysqlDriver().runQuery(null, null);
    expect(endSpy).to.be.called.once;
  });

  it('should end connection on failed execution', async () => {
    let end = async () => { };
    let connection = { query: async () => { throw new Error('Mock Error'); }, end };
    let endSpy = spy.on(connection, 'end');

    mock = sinon.mock(require('mysql2/promise'));
    mock.expects('createConnection').returns(Promise.resolve(connection));

    await expect(new MysqlDriver().runQuery(null, null)).to.eventually.throw()
      .then(() => { }, () => { });
    expect(endSpy).to.be.called.once;
  });
});
