import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class IncludeCommand extends Command {
  propertyPath: string[];

  constructor() {
    super(CommandType.Include);
  }
}
