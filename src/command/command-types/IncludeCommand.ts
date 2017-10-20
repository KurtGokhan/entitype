import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class IncludeCommand extends Command {
  propertyPath: string[];

  constructor() {
    super(CommandType.Include);
  }
}
