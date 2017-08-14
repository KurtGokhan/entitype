import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class FirstCommand extends Command {
  constructor() {
    super(CommandType.First);
  }
}
