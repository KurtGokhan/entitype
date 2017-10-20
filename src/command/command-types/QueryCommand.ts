import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class QueryCommand extends Command {
  constructor() {
    super(CommandType.Query);
  }
}
