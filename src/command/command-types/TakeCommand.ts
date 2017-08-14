import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class TakeCommand extends Command {
  amount: number;

  constructor() {
    super(CommandType.Take);
  }
}
