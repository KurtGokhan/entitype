import { PropertyPath } from '../fluent';

export class Alias {
  name: string;
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
    let name = 'a' + this.aliasIndex;
    this.aliasIndex++;

    let alias = new Alias();
    alias.name = name;

    return { alias: alias, children: {}, tree: this };
  }
}

export interface AliasContainer {
  alias?: Alias;
  children?: { [key: string]: AliasContainer };
  tree: AliasTree;
}
