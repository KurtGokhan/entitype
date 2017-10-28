import { WhereCommand } from '../command/command-types/WhereCommand';
import { ConditionType } from '../command/ConditionType';
import { IFilterCondition, IFiltered } from './interfaces';

export class WhereConditionPicker<EntityType, PropertyType> implements IFilterCondition<EntityType, PropertyType> {

  get not(): IFilterCondition<EntityType, PropertyType> {
    return new WhereConditionPicker(this.path, this.onFinished, !this.negated);
  }

  constructor(
    private path: string[],
    private onFinished: (cmd: WhereCommand) => IFiltered<EntityType>,
    private negated: boolean = false) {
  }

  private createWhereCommand(type: ConditionType, condition: string, ...parameters: any[]): IFiltered<EntityType> {
    let cmd = new WhereCommand();
    cmd.propertyPath = this.path;
    cmd.negated = this.negated;
    cmd.condition = condition;
    cmd.parameters = parameters || [];
    cmd.conditionType = type;
    return this.onFinished(cmd);
  }

  equals(value: PropertyType): IFiltered<EntityType> {
    return this.createWhereCommand(ConditionType.Equals, ' = {0}', value);
  }

  gt(value: PropertyType): IFiltered<EntityType> {
    return this.createWhereCommand(ConditionType.GreaterThan, ' > {0}', value);
  }

  gte(value: PropertyType): IFiltered<EntityType> {
    return this.createWhereCommand(ConditionType.GreaterThanOrEqual, ' >= {0}', value);
  }

  lt(value: PropertyType): IFiltered<EntityType> {
    return this.createWhereCommand(ConditionType.LessThan, ' < {0}', value);
  }

  lte(value: PropertyType): IFiltered<EntityType> {
    return this.createWhereCommand(ConditionType.LessThanOrEqual, ' <= {0}', value);
  }

  between(minValue: PropertyType, maxValue: PropertyType): IFiltered<EntityType> {
    return this.createWhereCommand(ConditionType.Between, ' BETWEEN {0} AND {1}', minValue, maxValue);
  }

  like(value: string): IFiltered<EntityType> {
    return this.createWhereCommand(ConditionType.Like, ' LIKE {0}', value);
  }

  isNull(): IFiltered<EntityType> {
    return this.createWhereCommand(ConditionType.IsNull, ' IS NULL');
  }

  in(array: PropertyType[]): IFiltered<EntityType> {
    return this.createWhereCommand(ConditionType.In, ' IN {0}', array);
  }
}
