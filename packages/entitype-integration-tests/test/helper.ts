import { useConfiguration } from 'entitype';
import { MysqlConnectionOptions } from 'entitype-mysql';
import { createConnection } from 'mysql2/promise';

import '../../../test/helper';

export let connectionOptions: MysqlConnectionOptions = {} as any;

try {
  connectionOptions = require('./config.json');
}
catch (err) {
}

connectionOptions.adapter = process.env.DB_ADAPTER || connectionOptions.adapter || 'mysql';
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

  await connection.execute(`DROP DATABASE IF EXISTS \`${connectionOptions.database}\``);
  await connection.execute(`CREATE DATABASE \`${connectionOptions.database}\``);

  if (seed) {
    await connection.query(seed);
  }

  await connection.end();
}
