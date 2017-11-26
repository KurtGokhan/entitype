import { container, DI_TYPES, DriverAdapter } from 'entitype/dist/plugins';
import * as fs from 'fs-extra';
import * as path from 'path';

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
    require('entitype-' + name);
  }

  return container.getNamed(DI_TYPES.driver, name) as DriverAdapter;
}
