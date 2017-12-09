import * as chai from 'chai';
import { useConfiguration } from 'entitype';
import { WebSqlConnectionOptions, WebSqlDriver } from 'entitype-websql';
import { createConnection } from 'mysql2/promise';

chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));

export let connectionOptions: WebSqlConnectionOptions = {
  adapter: 'websql',
  database: 'test',
  version: '1',
  description: 'Database for karma test'
} as any;

useConfiguration(connectionOptions as any);

export async function seedDatabase() {
  let driver = new WebSqlDriver();

  let seed = require('../mysql/config/seed-sqlite.sql');
  let seeds = seed.split(';');

  for (let index = 0; index < seeds.length; index++) {
    const seedPart = seeds[index];
    await driver.runQuery(seedPart, connectionOptions);
  }
}
