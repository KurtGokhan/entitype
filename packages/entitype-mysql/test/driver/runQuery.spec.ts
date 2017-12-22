import { expect, spy } from 'chai';
import * as sinon from 'sinon';
import { MysqlDriver } from '../../src';
import { setupConfiguration } from '../helper';

describe('entitype-mysql > driver > runQuery', async () => {
  beforeEach(setupConfiguration);

  let mock;

  afterEach(() => mock.restore());

  it('should end connection on successful execution', async () => {
    let end = async () => { };
    let connection = { query: async () => [], end };
    let endSpy = spy.on(connection, 'end');

    mock = sinon.stub(require('mysql2/promise'), 'createConnection')
      .returns(Promise.resolve(connection));

    await new MysqlDriver().runQuery(null, null);
    expect(endSpy).to.be.called.once;
  });

  it('should end connection on failed execution', async () => {
    let end = async () => { };
    let connection = { query: async () => { }, end };
    let endSpy = spy.on(connection, 'end');

    sinon.stub(connection, 'query').throws(new Error('Any Error'));

    mock = sinon.stub(require('mysql2/promise'), 'createConnection')
      .returns(Promise.resolve(connection));

    await expect(new MysqlDriver().runQuery(null, null)).to.eventually.be.rejectedWith('Any Error');
    expect(endSpy).to.be.called.once;
  });
});
