import { DecoratorStorage } from '../common/DecoratorStorage';
import { PropertyPath } from '../fluent';
import { Alias } from '../query/Alias';

export class JoinTreeNode {
  path: PropertyPath;
  pathPart: string;
  entity: DecoratorStorage.Entity;
  column: DecoratorStorage.Property;

  alias: Alias;

  parent: JoinTreeNode;
  childs: JoinTreeNode[];
  childDic: { [key: string]: JoinTreeNode };

  include: boolean;
}
