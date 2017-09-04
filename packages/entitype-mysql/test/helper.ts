import 'reflect-metadata';

import * as chai from 'chai';
import { createConnection } from 'mysql2/promise';
import { useConfiguration, ConnectionOptions } from 'entitype';
import { MysqlConnectionOptions } from 'src/MysqlConnectionOptions';

chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));

export const connectionOptions = require('./config.json') as MysqlConnectionOptions;

useConfiguration(connectionOptions);

export async function dropAndCreateDatabase(seed?: string) {
  let tmpConfig = <any>Object.assign({}, connectionOptions);
  tmpConfig.database = null;
  tmpConfig.multipleStatements = true;
  let connection = await createConnection(tmpConfig);

  let result = await connection.execute(`DROP DATABASE IF EXISTS \`${connectionOptions.database}\``);
  result = await connection.execute(`CREATE DATABASE \`${connectionOptions.database}\``);

  if (seed) {
    result = await connection.query(seed);
  }

  result = await connection.execute('SELECT t1.*, t2.* FROM model t1 left join childmodel t2 on t1.id = t2.parent_id;');
  console.log(result);
}
