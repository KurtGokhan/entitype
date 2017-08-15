import { ObjectType } from '../../fluent';
import { valueAsDbString } from '../../common/dbUtil';
import { WhereCommand } from '../command-types/WhereCommand';
import { WhereProperty } from '../../fluent';
import { getColumns, getEntity } from './column-helpers';
import { WhereSelector } from '../../fluent';
import { DecoratorStorage } from 'src/context/DecoratorStorage';

export function createWhereExpressionQueryBase<EntityType>(
  entityType: ObjectType<EntityType> | DecoratorStorage.Entity,
  path: string[] = []):
  WhereSelector<EntityType> {

  let entity = getEntity(entityType as any);
  let columns = getColumns(entityType);

  let parameter: WhereSelector<EntityType> = <any>{};
  for (let index = 0; index < columns.length; index++) {
    let column = columns[index];

    let propPath = path.slice().concat(column.name);

    parameter[column.name] = new WherePropertyBase<EntityType, any>(propPath, column, entity);
  }

  return parameter;
}

class WherePropertyBase<EntityType, PropertyType> implements WhereProperty<EntityType, PropertyType> {

  get not(): WhereProperty<EntityType, PropertyType> {
    return new WherePropertyBase(this.path, this.column, this.entity, !this.negated);
  }

  constructor(
    private path: string[],
    private column: DecoratorStorage.Column,
    private entity: DecoratorStorage.Entity,
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

  asEntity(): WhereSelector<PropertyType> {
    let entity = getEntity(this.column.type);

    if (!this.column.isNavigationProperty)
      throw Error('Only navigation properties can be queried as entity.');

    return createWhereExpressionQueryBase<PropertyType>(entity, this.path);
  }
}
