import { PropertyPath } from '../../fluent';
import { Alias } from '../../query/Alias';
import { DecoratorStorage } from '../../storage/DecoratorStorage';

export class JoinTreeNode {
  path: PropertyPath;
  pathPart: string;
  entity: DecoratorStorage.Entity;
  column: DecoratorStorage.Column;

  alias: Alias;

  parent: JoinTreeNode;
  childs: JoinTreeNode[];
  childDic: { [key: string]: JoinTreeNode };
}
