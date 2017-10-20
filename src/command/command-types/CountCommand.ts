import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class CountCommand extends Command {
  constructor() {
    super(CommandType.Count);
  }
}
