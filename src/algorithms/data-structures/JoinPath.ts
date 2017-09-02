
import { DecoratorStorage } from '../../storage/DecoratorStorage';
import { PropertyPath } from '../../fluent';

export class JoinPath {
  path: PropertyPath;
  pathPart: string;
  entity: DecoratorStorage.Entity;
  column: DecoratorStorage.Column;

  parent: JoinPath;
  childs: JoinPath[];
  childDic: { [key: string]: JoinPath };
}
