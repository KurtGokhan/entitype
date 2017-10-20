import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class FirstCommand extends Command {
  constructor() {
    super(CommandType.First);
  }
}
