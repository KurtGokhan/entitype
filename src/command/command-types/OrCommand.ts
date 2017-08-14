import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class OrCommand extends Command {
  constructor() {
    super(CommandType.OrWhere);
  }
}
