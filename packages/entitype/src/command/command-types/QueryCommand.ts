import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class QueryCommand extends Command {
  constructor() {
    super(CommandType.Query);
  }
}
