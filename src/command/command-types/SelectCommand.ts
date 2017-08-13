import { CommandType } from '../CommandType';
import { Command } from '../Command';

export class SelectCommand extends Command {
  columns: { alias: string, dbName: string }[];

  constructor() {
    super(CommandType.Select);
  }
}
