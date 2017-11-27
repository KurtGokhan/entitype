import { PropertyPath } from '../../fluent';
import { Command } from '../Command';
import { CommandType } from '../CommandType';

export class SelectCommand extends Command {
  columns: PropertyPath[];
  mentions: PropertyPath[];
  expression: (expression: any) => any;

  constructor() {
    super(CommandType.Select);
  }
}
