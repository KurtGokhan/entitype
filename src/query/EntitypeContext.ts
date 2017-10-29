import { Command } from '../command/Command';
import { CommandNode } from '../command/CommandNode';
import { DecoratorStorage } from '../common/DecoratorStorage';
import { ConnectionOptions } from '../configuration/ConnectionOptions';
import { ObjectType } from '../fluent';
import { container, DI_TYPES } from '../ioc';
import { CommandRunner } from '../query/CommandRunner';

export abstract class EntitypeContext {
  readonly connectionOptions: ConnectionOptions;

  constructor();
  constructor(connectionConfigName: string);
  constructor(connectionOptions: ConnectionOptions);

  constructor(private configOrName?: string | ConnectionOptions) {
    this.connectionOptions = this.resolveConfiguration();
    return this.createProxy();
  }

  private resolveConfiguration() {
    try {
      let config;
      if (!this.configOrName) {
        config = container.get(DI_TYPES.configuration);
      }
      else if (typeof this.configOrName === 'string') {
        config = container.getNamed(DI_TYPES.configuration, this.configOrName);
      }
      else {
        config = this.configOrName;
      }
      return config;
    }
    catch (err) {
    }
  }

  private createProxy() {
    let ctx = DecoratorStorage.getContext(this.constructor);
    let ctxDict = new Map(ctx.collections.map(col => [col.name, col] as [string, DecoratorStorage.DbCollection]));
    let self = this;

    return new Proxy(this, {
      get(target, name) {
        let collection = ctxDict.get(name as string);
        let targetProperty = target[name];

        // The called property is not decorated with DbSet, or it was already created
        if (!collection || targetProperty instanceof CommandNode)
          return targetProperty;

        let runCommandChain = (commands: Command[]) => {
          let runner: CommandRunner = new CommandRunner(commands, collection.entity as any, self.connectionOptions);
          return runner.run();
        };

        return new CommandNode(null, runCommandChain, collection.type as ObjectType<any>);
      }
    });
  }
}
