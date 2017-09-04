import 'reflect-metadata';

import * as chai from 'chai';
import { createConnection } from 'mysql2/promise';
import { useConfiguration, ConnectionOptions } from 'entitype';

chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));

export const connectionOptions = require('./config.json');

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
}
