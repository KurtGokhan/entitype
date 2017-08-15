import { PropertyPath } from '../../fluent';
import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class WhereCommand extends Command {
  negated: boolean = false;
  propertyPath: PropertyPath;
  condition: string;

  constructor() {
    super(CommandType.Where);
  }
}
