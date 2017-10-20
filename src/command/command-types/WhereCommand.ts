import { ConditionType } from '../ConditionType';
import { PropertyPath } from '../../fluent';
import { CommandType } from '../CommandType';
import { Command } from '../Command';

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
