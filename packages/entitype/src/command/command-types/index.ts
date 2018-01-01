import { Command } from '../Command';
import { CommandType } from '../CommandType';

export interface EditCommand {
  type: CommandType;
  entry: any;
}

export class InsertCommand extends Command implements EditCommand {
  constructor(public entry) {
    super(CommandType.Insert);
  }
}

export class UpdateCommand extends Command implements EditCommand {
  constructor(public entry) {
    super(CommandType.Update);
  }
}

export class PersistCommand extends Command implements EditCommand {
  constructor(public entry) {
    super(CommandType.Persist);
  }
}

export class SetCommand extends Command implements EditCommand {
  constructor(public entry) {
    super(CommandType.Set);
  }
}
