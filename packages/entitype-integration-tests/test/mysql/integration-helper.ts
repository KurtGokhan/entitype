import * as path from 'path';
import { dropAndCreateDatabase } from '../helper';
import * as fs from 'fs';

export async function integrationTestDatabaseSeed() {
  let seed = fs.readFileSync(path.join(__dirname, 'config/seed.sql')).toString();
  await dropAndCreateDatabase(seed);
}
