import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class CountCommand extends Command {
  constructor() {
    super(CommandType.Count);
  }
}
