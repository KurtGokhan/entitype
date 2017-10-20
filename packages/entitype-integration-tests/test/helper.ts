import 'reflect-metadata';

import * as chai from 'chai';
import { createConnection } from 'mysql2/promise';
import { useConfiguration, ConnectionOptions } from 'entitype';
import 'entitype';
import 'entitype-mysql';
import { MysqlConnectionOptions } from 'entitype-mysql';

chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));

export let connectionOptions: MysqlConnectionOptions = {} as any;

try {
  connectionOptions = require('./config.json');
}
catch (err) {
}

connectionOptions.adapter = process.env.DB_ADAPTER || connectionOptions.adapter || 'mysql2';
connectionOptions.database = process.env.DB_NAME || connectionOptions.database;
connectionOptions.user = process.env.DB_USER || connectionOptions.user;
connectionOptions.password = process.env.DB_PASSWORD || connectionOptions.password;
connectionOptions.host = process.env.DB_HOST || connectionOptions.host;
connectionOptions.port = +process.env.DB_PORT || connectionOptions.port;

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
