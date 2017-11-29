import * as fs from 'fs';
import { IBeforeAndAfterContext } from 'mocha';
import * as path from 'path';

import { dropAndCreateDatabase } from '../helper';

export async function integrationTestDatabaseSeed(this: IBeforeAndAfterContext) {
  this.timeout(10000);
  let seed = fs.readFileSync(path.join(__dirname, './seed.sql')).toString();
  await dropAndCreateDatabase(seed);
}
