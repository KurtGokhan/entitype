import { PropertyPath } from '../../fluent';
import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class SelectCommand extends Command {
  columns: SelectMapping[];

  constructor() {
    super(CommandType.Select);
  }
}

export class SelectMapping {
  path: PropertyPath;
  mapPath: PropertyPath;
}
