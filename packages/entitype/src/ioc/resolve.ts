import { ConnectionOptions } from '../configuration';
import { container, DI_TYPES, DriverAdapter, QueryBuilderAdapter } from './';

function loadPlugin(pluginName) {
  try {
    require('entitype-' + pluginName);
  }
  catch (err) {
  }
}

function getDependency<T>(type: symbol, name?: string): T {
  if (name != null) {
    if (!container.isBoundNamed(type, name)) loadPlugin(name);
    if (container.isBoundNamed(type, name))
      return container.getNamed(type, name) as T;
    return null;
  }
  else {
    if (container.isBound(type)) return container.get(type) as T;
    return null;
  }
}

export function getDriverAdapter(name: string): DriverAdapter {
  return getDependency(DI_TYPES.driver, name);
}

export function getQueryBuilder(name: string): QueryBuilderAdapter {
  return getDependency(DI_TYPES.queryBuilder, name);
}

export function getConfiguration(name?: string): ConnectionOptions {
  return getDependency(DI_TYPES.configuration, name);
}
