import { PropertyPath } from '../../fluent';
import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class SelectCommand extends Command {
  columns: SelectMapping[];
  structure: SelectMappingStructure[];

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
