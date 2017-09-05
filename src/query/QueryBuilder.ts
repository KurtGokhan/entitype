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


          let prop = this.context.getAliasedColumnForPath(cmd.propertyPath);
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
    let ctx = this.context;
    let tokens: string[] = [];

    let alias = ctx.getAliasForTable(branch.path);
    let tableWithAlias = `${branch.entity.dbName} as ${alias}`;
    if (branch.parent) {
      let mmp = branch.column.manyToManyMapping;
      let fk = branch.column.foreignKey;
      if (mmp) {
        let owner = DecoratorStorage.getEntity(mmp.owner);
        let leftEntity = branch.parent.entity;
        let rightEntity = branch.entity;

        let leftPK = leftEntity.columns.find(x => x.options.primaryKey);
        let rightPK = rightEntity.columns.find(x => x.options.primaryKey);

        let leftFK = owner.columns.find(x => x.name === mmp.leftKey);
        let rightFK = owner.columns.find(x => x.name === mmp.rightKey);

        let leftAlias = ctx.getAliasForTable(branch.parent.path);
        let rightAlias = ctx.getAliasForTable(branch.path);
        let ownerAlias = ctx.getAliasForMappingTable(branch.path);
        let ownerTableWithAlias = owner.dbName + ' as ' + ownerAlias;

        tokens.push('LEFT JOIN');
        tokens.push(ownerTableWithAlias);
        tokens.push('ON');
        tokens.push(ownerAlias + '.' + leftFK.dbName);
        tokens.push('=');
        tokens.push(leftAlias + '.' + leftPK.dbName);

        tokens.push('LEFT JOIN');
        tokens.push(tableWithAlias);
        tokens.push('ON');
        tokens.push(ownerAlias + '.' + rightFK.dbName);
        tokens.push('=');
        tokens.push(rightAlias + '.' + rightPK.dbName);
      }
      else {
        tokens.push('LEFT JOIN');
        tokens.push(tableWithAlias);

        let owner = branch.parent;
        let owned = branch;
        if (fk.owner === branch.entity.type) {
          owner = branch;
          owned = branch.parent;
        }

        let foreignKeyColumn = owner.entity.columns.find(x => x.name === fk.column);
        let fkTargetPK = owned.entity.columns.find(x => x.options.primaryKey);

        let ownerAlias = ctx.getAliasForTable(owner.path);
        let ownedAlias = ctx.getAliasForTable(owned.path);

        tokens.push('ON');
        tokens.push(ownerAlias + '.' + foreignKeyColumn.dbName);
        tokens.push('=');
        tokens.push(ownedAlias + '.' + fkTargetPK.dbName);
      }
    }
    else {
      tokens.push(tableWithAlias);
    }

    branch.childs.forEach(subBranch => {
      tokens.push(...this.resolveFromBranch(subBranch));
    });
    return tokens;
  }

  resolveOrderBy(): string[] {
    let ctx = this.context;
    let tokens: string[] = [];

    if (ctx.orders.length) {
      let orderList = [];
      ctx.orders.forEach(order => {
        let orderTokens = [];
        let aliasedColumn = this.context.getAliasedColumnForPath(order.propertyPath);
        orderTokens.push(aliasedColumn);
        orderTokens.push(order.descending ? 'DESC' : 'ASC');
        orderList.push(orderTokens.join(' '));
      });

      tokens.push('ORDER BY');
      tokens.push(orderList.join(', '));
    }
    return tokens;
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

    let selectedColumns = ctx.selectedColumns;

    let columnsQuery = '';
    if (ctx.count) columnsQuery = 'COUNT(*) as count';
    else if (selectedColumns.length) {
      columnsQuery = selectedColumns
        .map(col => {
          let aliasedColumnName = this.context.getAliasedColumnForPath(col.path);
          let alias = this.context.getAliasForColumn(col.path);
          return `${aliasedColumnName} as ${alias}`;
        }).join(', ');
    }
    else columnsQuery = 'null';


    let limitQuery = '';
    if (ctx.first) limitQuery = 'LIMIT 1';
    else if (ctx.take) limitQuery = 'LIMIT ' + ctx.take.amount;

    let offsetQuery = '';
    if (ctx.skip) offsetQuery = 'OFFSET ' + ctx.skip.amount;


    tokens.push('SELECT');
    tokens.push(columnsQuery);
    tokens.push('FROM');

    tokens.push(...this.resolveFrom());
    tokens.push(...this.resolveWhere());
    tokens.push(...this.resolveOrderBy());

    tokens.push(limitQuery);
    tokens.push(offsetQuery);

    let query = tokens.filter(x => !!x).join(' ');
    return query;
  }
}
