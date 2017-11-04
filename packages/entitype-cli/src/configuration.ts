import { container, DI_TYPES, DriverAdapter } from 'entitype/dist/plugins';
import * as fs from 'fs-extra';
import * as path from 'path';

import { vorpal } from './cli';

export const defaultConfigLookupFolders = ['.', './config'];
export const defaultConfigFileName = '.entitype-cli.json';

export async function getConfiguration(path?: string) {
  path = path || await findConfigurationFile();
  return fs.readJsonSync(path);
}

export async function findConfigurationFile() {
  let defaultPaths = defaultConfigLookupFolders.map(folder => path.resolve(path.join(folder, defaultConfigFileName)));
  return defaultPaths.find(fs.existsSync);
}

export async function getDriverAdapter(name: string): Promise<DriverAdapter> {
  if (!container.isBoundNamed(DI_TYPES.driver, name)) {
    try {
      require('entitype-' + name);
    }
    catch (err) {
      vorpal.activeCommand.log(err);
      throw err;
    }
  }

  return container.getNamed(DI_TYPES.driver, name) as DriverAdapter;
}
