import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class ToListCommand extends Command {
  constructor() {
    super(CommandType.ToList);
  }
}
