import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class OrderByCommand extends Command {
  propertyPath: string[];
  descending: boolean;

  constructor() {
    super(CommandType.OrderBy);
  }
}
