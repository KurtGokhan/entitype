
import '~/test/helper';

import { useConfiguration } from 'entitype';
import { WebSqlConnectionOptions, WebSqlDriver } from 'entitype-websql';

import nwSeed from '../northwind/seed-sqlite-partial';

let seed = require('../mysql/config/seed-sqlite.sql');

export let connectionOptions: WebSqlConnectionOptions = {
  adapter: 'websql',
  database: 'test',
  version: '1',
  description: 'Database for karma test'
} as any;

useConfiguration(connectionOptions as any);

export async function runSeed(seed: string) {
  let driver = new WebSqlDriver();

  let seeds = seed.split(';');

  for (let index = 0; index < seeds.length; index++) {
    const seedPart = seeds[index];
    await driver.runQuery(seedPart, connectionOptions as any);
  }
}
export async function seedNorthwindDatabase() {
  await runSeed(nwSeed);
}
export async function seedDatabase() {
  await runSeed(seed);
}
