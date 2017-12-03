import { container, DI_TYPES, DriverAdapter } from 'entitype/dist/plugins';
import * as fs from 'fs-extra';
import * as path from 'path';

import { IConfiguration } from './cli';

export const defaultConfigLookupFolders = ['.', './config'];
export const defaultConfigFileNames = ['entitype-cli.json', '.entitype-cli.json'];

export async function getConfiguration(path?: string): Promise<IConfiguration> {
  path = path || await findConfigurationFile();
  if (!path) return null;
  return await fs.readJson(path) as IConfiguration;
}

export async function findConfigurationFile() {
  let combinations = ([] as string[]).concat(...defaultConfigLookupFolders.map(folder =>
    defaultConfigFileNames.map(file => path.join(folder, file))
  ));
  let defaultPaths = combinations.map(filePath => path.resolve(filePath));
  return defaultPaths.find(fs.existsSync);
}

export async function getDriverAdapter(name: string): Promise<DriverAdapter> {
  if (!container.isBoundNamed(DI_TYPES.driver, name)) {
    require('entitype-' + name);
  }

  return container.getNamed(DI_TYPES.driver, name) as DriverAdapter;
}
