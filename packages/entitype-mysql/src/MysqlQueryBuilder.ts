import { ConditionType, JoinTreeNode, QueryBuilder, QueryBuilderAdapter, QueryContext } from 'entitype/dist/plugins';
import { valueAsDbString } from './util';

@QueryBuilder('mysql2')
export class MysqlQueryBuilder implements QueryBuilderAdapter {
  buildQuery(context: QueryContext): string {
    let ctx = context;

    let tokens: string[] = [];

    let selectedColumns = ctx.selectedColumns;

    let columnsQuery = '';
    if (ctx.count) columnsQuery = 'COUNT(*) as count';
    else if (selectedColumns.length) {
      columnsQuery = selectedColumns
        .map(col => {
          let aliasedColumnName = ctx.getAliasedColumnForPath(col.path);
          let alias = ctx.getAliasForColumn(col.path);
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

    tokens.push(...this.resolveFrom(ctx));
    tokens.push(...this.resolveWhere(ctx));
    tokens.push(...this.resolveOrderBy(ctx));

    tokens.push(limitQuery);
    tokens.push(offsetQuery);

    let query = tokens.filter(x => !!x).join(' ');
    return query;
  }

  private resolveFrom(ctx: QueryContext): string[] {
    return this.resolveFromBranch(ctx.joinTreeRoot, ctx);
  }

  resolveWhere(ctx: QueryContext): string[] {
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


          let prop = ctx.getAliasedColumnForPath(cmd.propertyPath);

          let condition = cmd.condition;

          for (let paramIndex = 0; paramIndex < cmd.parameters.length; paramIndex++) {
            let parameter = cmd.parameters[paramIndex];
            let paramAsString = '';

            if (cmd.conditionType === ConditionType.Like) paramAsString = valueAsDbString(parameter, true);
            else if (cmd.conditionType === ConditionType.In)
              paramAsString = '(' + (parameter as any[]).map(x => valueAsDbString(x)).join(',') + ')';
            else paramAsString = valueAsDbString(parameter, false);

            condition = condition.replace('{' + paramIndex + '}', paramAsString);
          }

          let whereQuery = prop + condition;

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


  private resolveFromBranch(branch: JoinTreeNode, ctx: QueryContext): string[] {
    let tokens: string[] = [];

    let alias = ctx.getAliasForTable(branch.path);
    let tableWithAlias = `${branch.entity.dbName} as ${alias}`;
    if (branch.parent) {
      let mmp = branch.column.manyToManyMapping;
      let fk = branch.column.foreignKey;
      if (mmp) {
        let owner = mmp.owner;
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
        if (fk.owner.type === branch.entity.type) {
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
      tokens.push(...this.resolveFromBranch(subBranch, ctx));
    });
    return tokens;
  }

  resolveOrderBy(ctx: QueryContext): string[] {
    let tokens: string[] = [];

    if (ctx.orders.length) {
      let orderList = [];
      ctx.orders.forEach(order => {
        let orderTokens = [];
        let aliasedColumn = ctx.getAliasedColumnForPath(order.propertyPath);
        orderTokens.push(aliasedColumn);
        orderTokens.push(order.descending ? 'DESC' : 'ASC');
        orderList.push(orderTokens.join(' '));
      });

      tokens.push('ORDER BY');
      tokens.push(orderList.join(', '));
    }
    return tokens;
  }
}
