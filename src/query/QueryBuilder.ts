import { QueryContext } from './QueryContext';
import { JoinTreeNode } from '../algorithms/data-structures/JoinTreeNode';
import { IncludeCommand } from '../command/command-types/IncludeCommand';
import { SkipCommand } from '../command/command-types/SkipCommand';
import { PropertyPath } from '../fluent';
import { DecoratorStorage } from '../storage/DecoratorStorage';

import { Command } from '../command/Command';
import { CountCommand } from '../command/command-types/CountCommand';
import { FirstCommand } from '../command/command-types/FirstCommand';
import { OrderByCommand } from '../command/command-types/OrderByCommand';
import { QueryCommand } from '../command/command-types/QueryCommand';
import { SelectCommand } from '../command/command-types/SelectCommand';
import { TakeCommand } from '../command/command-types/TakeCommand';
import { WhereCommand } from '../command/command-types/WhereCommand';
import { CommandType } from '../command/CommandType';

export class QueryBuilder {
  constructor(private context: QueryContext) { }

  private resolveFrom(): string[] {
    return this.resolveFromBranch(this.context.joinTreeRoot);
  }

  resolveWhere(): string[] {
    let ctx = this.context;

    let tokens: string[] = [];
    if (ctx.whereGroups.length && ctx.whereGroups[0].length) {
      tokens.push('WHERE');

      for (let index = 0; index < ctx.whereGroups.length; index++) {
        let group = ctx.whereGroups[index];

        if (index > 0) tokens.push('OR');

        tokens.push('(');
        for (let cmdIndex = 0; cmdIndex < group.length; cmdIndex++) {
          let cmd = group[cmdIndex];

          if (cmdIndex > 0) tokens.push('AND');


          let prop = cmd.propertyPath[cmd.propertyPath.length - 1];
          if (cmd.propertyPath.length > 1) {
            let entity = ctx.getColumnInfoForPropertyPath(cmd.propertyPath).parent;
            prop = entity.dbName + '.' + prop;
          }
          let whereQuery = prop + cmd.condition;

          tokens.push('(');
          if (cmd.negated) tokens.push('NOT');
          tokens.push(whereQuery);
          tokens.push(')');
        }
        tokens.push(')');
      }
    }
    return tokens;
  }


  private resolveFromBranch(branch: JoinTreeNode): string[] {
    let tokens: string[] = [];

    if (branch.parent) {
      tokens.push('LEFT JOIN');
      tokens.push(branch.entity.dbName);
      tokens.push('ON');

      let fk = branch.column.foreignKey;
      let owner = branch.parent;
      let owned = branch;
      if (fk.owner === branch.entity.type) {
        owner = branch;
        owned = branch.parent;
      }

      let foreignKeyColumn = owner.entity.columns.find(x => x.name === fk.column);
      let fkTargetPK = owned.entity.columns.find(x => x.options.primaryKey);

      tokens.push(owner.entity.dbName + '.' + foreignKeyColumn.dbName);
      tokens.push('=');
      tokens.push(owned.entity.dbName + '.' + fkTargetPK.dbName);
    }
    else {
      tokens.push(branch.entity.dbName);
    }

    branch.childs.forEach(subBranch => {
      tokens.push(...this.resolveFromBranch(subBranch));
    });
    return tokens;
  }

  private getTableAlias(path: PropertyPath) {
    return '';
  }


  protected escapeAlias(alias: string) {
    return '"' + alias + '"';
  }


  /**
   * Gets the query for commands
   *
   * @returns
   * @memberof QueryRunner
   */
  build() {
    let ctx = this.context;

    let tokens: string[] = [];

    let selectedColumns = ctx.select ? ctx.select.columns : [];
    let isScalar = selectedColumns.length === 1 && selectedColumns.find(x => !x.mapPath.length);

    let columnsQuery = '';
    if (ctx.count) columnsQuery = 'COUNT(*)';
    else if (isScalar) columnsQuery = selectedColumns[0].path.toString();
    else if (selectedColumns.length) columnsQuery = selectedColumns
      .map(x => `${x.path} as ${this.context.getAliasForPath(x.path).name}`).join(', ');
    else columnsQuery = '*';


    let limitQuery = '';
    if (ctx.first) limitQuery = 'TOP 1';
    else if (ctx.take) limitQuery = 'TOP ' + ctx.take.amount;

    tokens.push('SELECT');
    tokens.push(limitQuery);
    tokens.push(columnsQuery);
    tokens.push('FROM');

    tokens.push(...this.resolveFrom());
    tokens.push(...this.resolveWhere());

    if (ctx.orders.length) {
      tokens.push('ORDER BY');

      ctx.orders.forEach(order => {
        tokens.push(<any>order.propertyPath);
        tokens.push(order.descending ? 'DESC' : 'ASC');
        tokens.push(',');
      });
      tokens.pop();
    }


    let query = tokens.filter(x => !!x).join(' ');
    return query;
  }
}
