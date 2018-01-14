import { EntitypeMetadata } from '../common/EntitypeMetadata';
import { PropertyPath } from '../fluent';
import { Alias } from '../query/Alias';

export class JoinTreeNode {
  path: PropertyPath;
  pathPart: string;
  entity: EntitypeMetadata.Entity;
  column: EntitypeMetadata.Property;

  alias: Alias;

  parent: JoinTreeNode;
  childs: JoinTreeNode[];
  childDic: { [key: string]: JoinTreeNode };

  include: boolean;
}
