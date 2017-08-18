import { OrderByCommand } from '../command/command-types/OrderByCommand';
import { WhereCommand } from '../command/command-types/WhereCommand';
import { FirstCommand } from '../command/command-types/FirstCommand';
import { CountCommand } from '../command/command-types/CountCommand';
import { TakeCommand } from '../command/command-types/TakeCommand';
import { QueryCommand } from '../command/command-types/QueryCommand';
import { Command } from '../command/Command';
import { SelectCommand } from '../command/command-types/SelectCommand';
import { CommandType } from '../command/CommandType';
import { CommandNode } from '../command/CommandNode';
import { DecoratorStorage } from 'src/storage/DecoratorStorage';
import { IncludeCommand } from 'src/command/command-types/IncludeCommand';
import { SkipCommand } from 'src/command/command-types/SkipCommand';
import { OrCommand } from 'src/command/command-types/OrCommand';
import { PropertyPath } from 'src/fluent';
import { JoinPath } from 'src/algorithms/data-structures/JoinPath';

export class QueryRunner {
  private includes: IncludeCommand[];
  private wheres: WhereCommand[];
  private orders: OrderByCommand[];

  private select: SelectCommand;
  private isQuery: QueryCommand;
  private skip: SkipCommand;
  private take: TakeCommand;
  private count: CountCommand;
  private first: FirstCommand;

  private whereGroups: WhereCommand[][];


  private joinPathRoot: JoinPath;

  constructor(private commandChain: Command[], private entity: DecoratorStorage.Entity) {
    this.resolveCommands();
    this.resolveJoins();
  }

  private resolveCommands() {
    this.includes = this.commandChain.filter(x => x.type === CommandType.Include) as IncludeCommand[];
    this.wheres = this.commandChain.filter(x => x.type === CommandType.Where) as WhereCommand[];
    this.orders = this.commandChain.filter(x => x.type === CommandType.OrderBy) as OrderByCommand[];

    this.select = this.commandChain.find(x => x.type === CommandType.Select) as SelectCommand;
    this.isQuery = this.commandChain.find(x => x.type === CommandType.Query) as QueryCommand;
    this.take = this.commandChain.find(x => x.type === CommandType.Take) as TakeCommand;
    this.skip = this.commandChain.find(x => x.type === CommandType.Skip) as SkipCommand;
    this.count = this.commandChain.find(x => x.type === CommandType.Count) as CountCommand;
    this.first = this.commandChain.find(x => x.type === CommandType.First) as FirstCommand;


    this.whereGroups = [[]];
    let currentWhereGroup = this.whereGroups[0];
    let firstWhereIndex = this.commandChain.findIndex(x => x.type === CommandType.Where);
    if (firstWhereIndex >= 0) {
      for (let index = firstWhereIndex; index < this.commandChain.length; index++) {
        let cmd = this.commandChain[index];

        if (cmd.type === CommandType.OrWhere) {
          currentWhereGroup = [];
          this.whereGroups.push(currentWhereGroup);
        }
        else if (cmd.type === CommandType.Where) {
          currentWhereGroup.push(cmd as WhereCommand);
        }
        else break;
      }
    }
  }

  private getColumnInfoForPropertyPath(path: PropertyPath): DecoratorStorage.Column {
    let entity = this.entity;
    let col = null;

    for (let index = 0; index < path.length; index++) {
      let prop = path[index];

      if (!entity) throw Error('Wrong property path in the query');

      col = entity.columns.find(x => x.name === prop);
      entity = DecoratorStorage.getEntity(col.type);
    }
    return col;
  }


  /**
   * Creates a join tree so that it can be used easily in the query
   *
   * @private
   * @memberof QueryRunner
   */
  private resolveJoins() {
    let paths: PropertyPath[] = [];
    if (this.select)
      paths.push(...this.select.columns.map(x => x.path).filter(x => x.length > 1));
    paths.push(...this.wheres.map(x => x.propertyPath).filter(x => x.length > 1));
    paths.push(...this.orders.map(x => x.propertyPath).filter(x => x.length > 1));

    paths = paths.map(x => x.slice(0, x.length - 1));
    paths.push(...this.includes.map(x => x.propertyPath));


    this.joinPathRoot = { entity: this.entity, path: [], pathPart: '', parent: null, column: null, childs: [], childDic: {} };

    paths.forEach(path => {
      let currentPathNode = this.joinPathRoot;

      path.forEach(node => {
        let pathNode = currentPathNode.childDic[node];

        if (!pathNode) {
          let col = currentPathNode.entity.columns.find(x => x.name === node);
          let colEntity = DecoratorStorage.getEntity(col.type);
          pathNode = currentPathNode.childDic[node] = {
            path: currentPathNode.path.concat(node),
            pathPart: node,
            entity: colEntity,
            column: col,
            parent: currentPathNode,
            childs: [],
            childDic: {}
          };
          currentPathNode.childs.push(pathNode);
        }
        currentPathNode = pathNode;
      });
    });
  }

  private resolveFrom(): string {
    let tokens = this.resolveFromBranch(this.joinPathRoot);
    return tokens.filter(x => !!x).join(' ');
  }

  private resolveFromBranch(branch: JoinPath): string[] {
    let tokens: string[] = [];

    if (branch.parent) {
      tokens.push('LEFT JOIN');
      tokens.push(branch.entity.dbName);
      tokens.push(this.getTableAlias(branch.path));
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
    return '[' + alias + ']';
  }


  /**
   * Run the commands and get the result
   *
   * @returns
   * @memberof QueryRunner
   */
  run() {

    let tokens: string[] = [];

    let selectedColumns = this.select ? this.select.columns : [];
    let isScalar = selectedColumns.length === 1 && selectedColumns.find(x => !x.mapPath.length);

    let columnsQuery = '';
    if (this.count) columnsQuery = 'COUNT(*)';
    else if (isScalar) columnsQuery = selectedColumns[0].path.toString();
    else if (selectedColumns.length) columnsQuery = selectedColumns.map(x => `${x.path} as ${x.mapPath}`).join(', ');
    else columnsQuery = '*';


    let limitQuery = '';
    if (this.first) limitQuery = 'TOP 1';
    else if (this.take) limitQuery = 'TOP ' + this.take.amount;

    tokens.push('SELECT');
    tokens.push(limitQuery);
    tokens.push(columnsQuery);
    tokens.push('FROM');

    let from = this.resolveFrom();
    tokens.push(from);

    if (this.whereGroups.length && this.whereGroups[0].length) {
      tokens.push('WHERE');

      for (let index = 0; index < this.whereGroups.length; index++) {
        let group = this.whereGroups[index];

        if (index > 0) tokens.push('OR');

        tokens.push('(');
        for (let cmdIndex = 0; cmdIndex < group.length; cmdIndex++) {
          let cmd = group[cmdIndex];

          if (cmdIndex > 0) tokens.push('AND');

          let whereQuery = cmd.propertyPath + cmd.condition;

          tokens.push('(');
          if (cmd.negated) tokens.push('NOT');
          tokens.push(whereQuery);
          tokens.push(')');
        }
        tokens.push(')');
      }
    }

    if (this.orders.length) {
      tokens.push('ORDER BY');

      this.orders.forEach(order => {
        tokens.push(<any>order.propertyPath);
        tokens.push(order.descending ? 'DESC' : 'ASC');
        tokens.push(',');
      });
      tokens.pop();
    }


    let query = tokens.filter(x => !!x).join(' ');

    if (this.isQuery) return query;
    return this.runQuery(query);
  }


  /**
   * Run a SQL string against the database
   *
   * @param {string} sql
   * @returns
   * @memberof QueryRunner
   */
  runQuery(sql: string) {
    return Promise.resolve([]);
  }
}
