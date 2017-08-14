import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class SkipCommand extends Command {
  amount: number;

  constructor() {
    super(CommandType.Skip);
  }
}
