import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class SkipCommand extends Command {
  limit: number;

  constructor() {
    super(CommandType.Skip);
  }
}
