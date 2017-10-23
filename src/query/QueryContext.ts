import { JoinTreeNode } from '../algorithms/data-structures/JoinTreeNode';
import { Command } from '../command/Command';
import { CountCommand } from '../command/command-types/CountCommand';
import { FirstCommand } from '../command/command-types/FirstCommand';
import { IncludeCommand } from '../command/command-types/IncludeCommand';
import { OrderByCommand } from '../command/command-types/OrderByCommand';
import { QueryCommand } from '../command/command-types/QueryCommand';
import { SelectCommand, SelectMapping, SelectMappingStructure } from '../command/command-types/SelectCommand';
import { SkipCommand } from '../command/command-types/SkipCommand';
import { TakeCommand } from '../command/command-types/TakeCommand';
import { WhereCommand } from '../command/command-types/WhereCommand';
import { CommandType } from '../command/CommandType';
import { UnknownPropertyError } from '../errors/UnknownPropertyError';
import { PropertyPath } from '../fluent';
import { DecoratorStorage } from '../storage/DecoratorStorage';
import { Alias, AliasContainer, AliasTree } from './Alias';

export class QueryContext {

  public includes: IncludeCommand[];
  public wheres: WhereCommand[];
  public orders: OrderByCommand[];

  public select: SelectCommand;
  public isQuery: QueryCommand;
  public skip: SkipCommand;
  public take: TakeCommand;
  public count: CountCommand;
  public first: FirstCommand;

  public whereGroups: WhereCommand[][];

  public joinTreeRoot: JoinTreeNode;

  public selectedColumns: SelectMapping[];
  public selectStructure: SelectMappingStructure[];


  private aliasContainer: AliasTree = new AliasTree();


  constructor(public commandChain: Command[], public entity: DecoratorStorage.Entity) {
    this.resolveCommands();
    this.resolveJoins();
    this.resolveSelectedColumns();
    this.resolveAliases();
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

  private resolveSelectedColumns() {
    if (this.select) {
      this.selectedColumns = [];
      this.selectStructure = this.select.structure;

      this.select.columns.forEach(selectedCol => {
        let colInfo = this.getColumnInfoForPropertyPath(selectedCol.path);
        if (colInfo.isColumn)
          this.selectedColumns.push(selectedCol);
        else {
          let node = this.getJoinTreeNodeForPath(selectedCol.path);
          this.addEntityToSelectedColumnsAndStructure(selectedCol.mapPath, node);
        }
      });
    }
    else {
      this.selectStructure = [];
      this.selectedColumns = [];
      this.addEntityToSelectedColumnsAndStructure([], this.joinTreeRoot);
    }
  }

  private addEntityToSelectedColumnsAndStructure(baseMappedPath: PropertyPath, node: JoinTreeNode) {
    let column = node.column;
    let path = node.path;
    this.selectStructure.push({
      isObject: column ? column.isNavigationProperty && !column.isArray : true,
      mapPath: baseMappedPath,
      isArray: column && column.isArray,
      value: null, dependsOn: node.dependsOn
    });
    node.entity.columns.filter(x => x.isColumn).forEach(prop => {
      this.selectedColumns.push({ mapPath: baseMappedPath.concat(prop.name), path: path.concat(prop.name) });
    });

    node.childs.filter(x => x.include).forEach(childNode => {
      this.addEntityToSelectedColumnsAndStructure(baseMappedPath.concat(childNode.pathPart), childNode);
    });
  }

  /** Creates a join tree so that it can be used easily in the query */
  private resolveJoins() {
    let paths: PropertyPath[] = [];
    paths.push(...this.wheres.map(x => x.propertyPath).filter(x => x.length > 1));
    paths.push(...this.orders.map(x => x.propertyPath).filter(x => x.length > 1));

    paths = paths.map(x => x.slice(0, x.length - 1));


    let includedPaths: PropertyPath[] = [];
    includedPaths.push(...this.includes.map(x => x.propertyPath));
    if (this.select) {
      includedPaths.push(...this.select.columns.map(x => x.path).filter(x => x.length > 1).map(x => x.slice(0, -1)));
      includedPaths.push(...this.select.columns.map(x => x.path).filter(x => this.getColumnInfoForPropertyPath(x).isNavigationProperty));
    }

    this.joinTreeRoot = {
      entity: this.entity, path: [], pathPart: '', parent: null,
      column: null, childs: [], childDic: {}, alias: null, include: true, dependsOn: null
    };
    includedPaths.forEach(path => this.createBranchesForPath(path, true));
    paths.forEach(path => this.createBranchesForPath(path, false));
  }

  private createBranchesForPath(path: PropertyPath, include: boolean) {
    let currentPathNode = this.joinTreeRoot;

    path.forEach(node => {
      let pathNode = currentPathNode.childDic[node];

      if (!pathNode) {
        let parentPath = currentPathNode.path;
        let currentPath = parentPath.concat(node);
        let col = currentPathNode.entity.columns.find(x => x.name === node);
        let fk = col.foreignKey;
        let dependsOn = null;
        let colEntity = DecoratorStorage.getEntity(col.type);

        if (fk && col.isNavigationProperty) {
          let pk = colEntity.columns.find(x => x.options.primaryKey);
          dependsOn = currentPath.concat(pk.name);
        }
        pathNode = currentPathNode.childDic[node] = {
          path: currentPath,
          pathPart: node,
          entity: colEntity,
          column: col,
          dependsOn,
          parent: currentPathNode,
          childs: [],
          childDic: {},
          alias: null,
          include: include
        };
        currentPathNode.childs.push(pathNode);
      }
      currentPathNode = pathNode;
    });
  }

  private resolveAliases() {
    this.selectedColumns.map(x => ({ alias: this.getAliasForColumn(x.path), col: x }));
  }


  getJoinTreeNodeForPath(path: PropertyPath): JoinTreeNode {
    let currentPathNode = this.joinTreeRoot;

    path.forEach(node => {
      currentPathNode = currentPathNode.childDic[node];
    });
    return currentPathNode;
  }

  getColumnInfoForPropertyPath(path: PropertyPath): DecoratorStorage.Column {
    let entity = this.entity;
    let col = null;

    for (let index = 0; index < path.length; index++) {
      let prop = path[index];

      if (!entity) throw new UnknownPropertyError(prop);

      col = entity.columns.find(x => x.name === prop);
      entity = DecoratorStorage.getEntity(col.type);
    }
    return col;
  }

  getAlias(path: PropertyPath): Alias {
    let cont = this.aliasContainer.rootContainer;
    for (let index = 0; index < path.length; index++) {
      let pathPart = path[index];
      let child = cont.children[pathPart];
      if (!child) {
        child = cont.children[pathPart] = this.aliasContainer.newAlias();
      }
      cont = child;
    }

    return cont.alias;
  }

  getAliasForColumn(path: PropertyPath): string {
    return 'a' + this.getAlias(path).name;
  }

  getAliasForTable(path: PropertyPath): string {
    return 't' + this.getAlias(path).name;
  }

  getAliasForMappingTable(path: PropertyPath): string {
    return 'm' + this.getAlias(path).name;
  }

  getAliasedColumnForPath(path: PropertyPath): string {
    let tableAlias = this.getAliasForTable(path.slice(0, -1));
    let column = this.getColumnInfoForPropertyPath(path);

    return tableAlias + '.' + column.dbName;
  }
}
