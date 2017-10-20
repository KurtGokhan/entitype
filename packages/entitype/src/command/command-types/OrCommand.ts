import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class OrCommand extends Command {
  constructor() {
    super(CommandType.OrWhere);
  }
}
