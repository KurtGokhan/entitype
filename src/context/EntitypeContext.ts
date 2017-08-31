import { DbSet } from '../collections/DbSet';
import { ConnectionOptions } from '../configuration/ConnectionOptions';
import { DecoratorStorage } from 'src/storage/DecoratorStorage';

export abstract class EntitypeContext {
  readonly connectionOptions: ConnectionOptions;

  constructor();
  constructor(connectionConfigName: string);
  constructor(connectionOptions: ConnectionOptions);

  constructor(configOrName: string | ConnectionOptions = 'default') {
    if (typeof configOrName === 'string') {
      this.connectionOptions = ConnectionOptions.getByName(configOrName);
    }
    else {
      this.connectionOptions = configOrName;
    }

    let ctx = DecoratorStorage.getContext(this.constructor);
    let ctxDict = new Map(ctx.collections.map(col => [col.name, col] as [string, DecoratorStorage.DbCollection]));

    return new Proxy(this, {
      get(target, name) {
        let collection = ctxDict.get(name as string);
        let targetProperty = target[name];

        // The called property is not decorated with DbSet, or it was already created
        if (!collection || targetProperty instanceof DbSet)
          return targetProperty;

        return new DbSet(collection.type as any);
      }
    });
  }
}
