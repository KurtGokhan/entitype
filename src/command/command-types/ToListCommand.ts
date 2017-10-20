import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class ToListCommand extends Command {
  constructor() {
    super(CommandType.ToList);
  }
}
