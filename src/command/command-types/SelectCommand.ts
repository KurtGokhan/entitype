import { PropertyPath } from '../../fluent';
import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class SelectCommand extends Command {
  columns: SelectMapping[];
  structure: SelectMappingStructure[];
  expression: (expression: any) => any;

  constructor() {
    super(CommandType.Select);
  }
}

export class SelectMapping {
  path: PropertyPath;
  mapPath: PropertyPath;
}

export class SelectMappingStructure {
  isArray: boolean;
  isObject: boolean;
  value: any;
  mapPath: PropertyPath;
}
