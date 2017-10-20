import { ConditionType } from '../command/ConditionType';
import { UnknownPropertyError } from '../errors/UnknownPropertyError';
import { DecoratorStorage } from '../storage/DecoratorStorage';

import { WhereCommand } from '../command/command-types/WhereCommand';
import { ObjectType, WhereConditionBuilder, WhereProperty } from './';

export function createWhereExpressionQueryBase<EntityType>(
  entityType: ObjectType<EntityType> | DecoratorStorage.Entity,
  path: string[] = [],
  columnOfEntity: DecoratorStorage.Column = null
):
  WhereProperty<EntityType> {

  let parameter = () => new WherePropertyBase<any>(path);

  let entity = DecoratorStorage.getEntity(entityType as any);

  let props = {};
  let handler = {
    get: function (target, name) {
      if (name in props)
        return props[name];
      throw new UnknownPropertyError(name);
    }
  };

  let proxy = new Proxy(parameter, handler);


  if (entity || (columnOfEntity && columnOfEntity.isNavigationProperty)) {
    let columns = entity.columns;

    for (let index = 0; index < columns.length; index++) {
      let column = columns[index];

      let propPath = path.concat(column.name);

      Object.defineProperty(props, column.name, {
        get() {
          let colEntity = DecoratorStorage.getEntity(column.type);

          return createWhereExpressionQueryBase<any>(colEntity, propPath);
        }
      });
    }
  }

  return proxy;
}

class WherePropertyBase<PropertyType> implements WhereConditionBuilder<PropertyType> {

  get not(): WhereConditionBuilder<PropertyType> {
    return new WherePropertyBase(this.path, !this.negated);
  }

  constructor(
    private path: string[],
    private negated: boolean = false) {
  }

  private createWhereCommand(type: ConditionType, condition: string, ...parameters: any[]): WhereCommand {
    let cmd = new WhereCommand();
    cmd.propertyPath = this.path;
    cmd.negated = this.negated;
    cmd.condition = condition;
    cmd.parameters = parameters || [];
    cmd.conditionType = type;
    return cmd;
  }

  equals(value: PropertyType): WhereCommand {
    return this.createWhereCommand(ConditionType.Equals, ' = {0}', value);
  }

  gt(value: PropertyType): WhereCommand {
    return this.createWhereCommand(ConditionType.GreaterThan, ' > {0}', value);
  }

  gte(value: PropertyType): WhereCommand {
    return this.createWhereCommand(ConditionType.GreaterThanOrEqual, ' >= {0}', value);
  }

  lt(value: PropertyType): WhereCommand {
    return this.createWhereCommand(ConditionType.LessThan, ' < {0}', value);
  }

  lte(value: PropertyType): WhereCommand {
    return this.createWhereCommand(ConditionType.LessThanOrEqual, ' <= {0}', value);
  }

  between(minValue: PropertyType, maxValue: PropertyType): WhereCommand {
    return this.createWhereCommand(ConditionType.Between, ' BETWEEN {0} AND {1}', minValue, maxValue);
  }

  like(value: string): WhereCommand {
    return this.createWhereCommand(ConditionType.Like, ' LIKE {0}', value);
  }

  isNull(): WhereCommand {
    return this.createWhereCommand(ConditionType.IsNull, ' IS NULL');
  }

  in(array: PropertyType[]): WhereCommand {
    return this.createWhereCommand(ConditionType.In, ' IN ({0})', array);
  }
}
