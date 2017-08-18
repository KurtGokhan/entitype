
import { DecoratorStorage } from 'src/storage/DecoratorStorage';
import { PropertyPath } from 'src/fluent';

export class JoinPath {
  path: PropertyPath;
  pathPart: string;
  entity: DecoratorStorage.Entity;
  column: DecoratorStorage.Column;

  parent: JoinPath;
  childs: JoinPath[];
  childDic: { [key: string]: JoinPath };
}
