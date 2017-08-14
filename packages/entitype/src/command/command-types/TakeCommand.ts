import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class TakeCommand extends Command {
  limit: number;

  constructor() {
    super(CommandType.Take);
  }
}
