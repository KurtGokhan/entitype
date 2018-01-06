import { expect } from 'chai';
import { WebSqlDriver } from '../src';

describe('entitype-websql > driver > runQuery', async () => {
  it('should throw error when WebSql is not available', async () => {
    global['window'] = {};
    await expect(new WebSqlDriver().runQuery(null, null))
      .to.eventually.be.rejectedWith('Your browser does not support a stable version of WebSql.');
    delete global['window'];
  });

  it('should throw error when options is not object', async () => {
    global['window'] = { openDatabase: () => { } };
    await expect(new WebSqlDriver().runQuery(null, ''))
      .to.eventually.be.rejected;
    delete global['window'];
  });

  it('should open connection and do transaction', async () => {
    let options = {
      database: 'testDB',
      size: 5000
    };

    let testQuery = 'this is my websql test query';

    let sampleResults = Array.from({ length: 6 }).map(x => Math.random());
    let sampleResultSet = {
      rows: {
        length: 6,
        item: (index) => sampleResults[index]
      }
    };

    let connection = {
      transaction: (txFun, onError, onSuccess) => {
        let sql = {
          executeSql: (query, params, callback) => {
            expect(query).to.equal(testQuery);
            expect(params).to.eql([]);
            callback(null, sampleResultSet);
          }
        };
        txFun(sql);
        onSuccess();
      }
    };

    global['window'] = {
      openDatabase: (db, version, description, size) => {
        expect(db).to.equal(options.database);
        expect(version).to.equal('1');
        expect(description).to.equal('');
        expect(size).to.equal(options.size);

        return connection;
      }
    };


    let [rows, columns] = await new WebSqlDriver().runQuery(testQuery, options as any);

    expect(columns).to.be.null;
    expect(rows).to.eql(sampleResults);

    delete global['window'];
  });
});

describe('entitype-websql > driver > getEntities', async () => {
  it('should return error', async () => {
    await expect(new WebSqlDriver().getEntities(null)).to.eventually.be.rejected;
  });
});
