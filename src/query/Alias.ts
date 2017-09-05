import { PropertyPath } from '../fluent';

export class Alias {
  name: number;
  path: PropertyPath;
  mapPath: PropertyPath;
  isTable: boolean;
}

export class AliasTree {
  rootContainer: AliasContainer;
  aliasIndex: number = 0;

  constructor() {
    this.rootContainer = this.newAlias();
  }

  newAlias(): AliasContainer {
    let alias = new Alias();
    alias.name = this.aliasIndex++;

    return { alias: alias, children: {}, tree: this };
  }
}

export interface AliasContainer {
  alias?: Alias;
  children?: { [key: string]: AliasContainer };
  tree: AliasTree;
}
