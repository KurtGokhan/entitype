import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class TakeCommand extends Command {
  amount: number;

  constructor() {
    super(CommandType.Take);
  }
}
