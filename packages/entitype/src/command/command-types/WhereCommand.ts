import { PropertyPath } from '../../fluent';
import { Command } from '../Command';
import { CommandType } from '../CommandType';
import { ConditionType } from '../ConditionType';

export class WhereCommand extends Command {
  negated: boolean = false;
  propertyPath: PropertyPath;
  condition: string;
  conditionType: ConditionType;
  parameters: any[];

  constructor() {
    super(CommandType.Where);
  }
}
