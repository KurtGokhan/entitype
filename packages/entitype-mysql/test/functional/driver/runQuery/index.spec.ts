import * as fs from 'fs';
import * as path from 'path';
import { Mysql2Driver } from 'src/Mysql2Driver';
import { connectionOptions, dropAndCreateDatabase } from 'test/helper';
import { expect } from 'chai';

describe('driver > runQuery', async () => {
  let seed = fs.readFileSync(path.join(__dirname, 'config/seed.sql')).toString();

  beforeEach(async () => {
    await dropAndCreateDatabase(seed);
  });

  it('should be able to run basic select all query', async () => {
    let driver = new Mysql2Driver();
    let result = await driver.runQuery('select * from model', connectionOptions);
    let [rows, cols] = result;
    expect(rows).to.have.length(3);
    expect(cols).to.have.length(2);
    expect(rows[0]['name']).to.be.equal('Model 1');
  });
});
