import * as fs from 'fs';
import * as path from 'path';
import { dropAndCreateDatabase } from '../helper';

export async function integrationTestDatabaseSeed() {
  let seed = fs.readFileSync(path.join(__dirname, 'config/seed.sql')).toString();
  await dropAndCreateDatabase(seed);
}
