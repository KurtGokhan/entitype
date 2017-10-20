import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class OrderByCommand extends Command {
  propertyPath: string[];
  descending: boolean;

  constructor() {
    super(CommandType.OrderBy);
  }
}
