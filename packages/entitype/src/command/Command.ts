import { CommandType } from './CommandType';

export class Command {
  readonly type: CommandType;

  constructor(type: CommandType) {
    this.type = type;
  }
}
