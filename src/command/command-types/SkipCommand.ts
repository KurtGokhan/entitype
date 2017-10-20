import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class SkipCommand extends Command {
  amount: number;

  constructor() {
    super(CommandType.Skip);
  }
}
