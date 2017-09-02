import { UnknownPropertyError } from '../errors/UnknownPropertyError';
import { DecoratorStorage } from '../storage/DecoratorStorage';

import { WhereCommand } from '../command/command-types/WhereCommand';
import { valueAsDbString } from '../common/dbUtil';
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

  private createWhereCommand(condition: string): WhereCommand {
    let cmd = new WhereCommand();
    cmd.propertyPath = this.path;
    cmd.negated = this.negated;
    cmd.condition = condition;
    return cmd;
  }

  equals(value: PropertyType): WhereCommand {
    return this.createWhereCommand(' = ' + valueAsDbString(value));
  }

  gt(value: PropertyType): WhereCommand {
    return this.createWhereCommand(' > ' + valueAsDbString(value));
  }

  gte(value: PropertyType): WhereCommand {
    return this.createWhereCommand(' >= ' + valueAsDbString(value));
  }

  lt(value: PropertyType): WhereCommand {
    return this.createWhereCommand(' < ' + valueAsDbString(value));
  }

  lte(value: PropertyType): WhereCommand {
    return this.createWhereCommand(' <= ' + valueAsDbString(value));
  }

  between(minValue: PropertyType, maxValue: PropertyType): WhereCommand {
    return this.createWhereCommand(' BETWEEN ' + valueAsDbString(minValue) + ' AND ' + valueAsDbString(maxValue));
  }

  like(value: string): WhereCommand {
    return this.createWhereCommand(' LIKE ' + valueAsDbString(value, true));
  }

  isNull(): WhereCommand {
    return this.createWhereCommand(' IS NULL');
  }

  in(array: PropertyType[]): WhereCommand {
    return this.createWhereCommand(' IN ' + '(' + array.map(x => valueAsDbString(x)).join(',') + ')');
  }
}
