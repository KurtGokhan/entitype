import { getObjectPath, setObjectPath } from '../common/util';
import { ColumnData, RowData } from '../ioc/index';
import { QueryContext } from './QueryContext';

export class ResultMapper {

  constructor(private context: QueryContext) { }

  mapResult(dataResult: RowData[]) {
    if (this.context.count) {
      return +dataResult[0].count;
    }

    let resultArray = this.convertRowDataToObjects(dataResult, null);

    if (this.context.select)
      resultArray = resultArray.map(this.context.select.expression);

    this.removeNonexistentChildren(resultArray);

    if (this.context.first) return resultArray[0];
    return resultArray;
  }

  convertRowDataToObjects(data: RowData[], colData: ColumnData[]) {
    let resultArray = [];
    let count = data.length;
    for (let index = 0; index < count; index++) {
      let result = resultArray[index];
      let row = data[index];

      // TODO: use column data to get aliases
      let aliases = Object.keys(row)
        .map(x => ({ alias: x, path: this.context.getPathForAlias(parseInt(x.replace('a', ''))) }));

      for (let aliasIndex = 0; aliasIndex < aliases.length; aliasIndex++) {
        let aliasPath = aliases[aliasIndex];
        if (aliasPath.path)
          result = setObjectPath(result, aliasPath.path, row[aliasPath.alias]);
      }
      resultArray[index] = result;
    }

    return resultArray;
  }

  removeNonexistentChildren(resultArray: any[]) {
    let fullTableMaps = this.context.fullTableMaps.map(x => ({
      entity: this.context.getEntityInfoForPropertyPath(x.path),
      map: x
    }));

    for (let index = 0; index < resultArray.length; index++) {
      let result = resultArray[index];

      for (let entIndex = 0; entIndex < fullTableMaps.length; entIndex++) {
        let map = fullTableMaps[entIndex];
        let pks = map.entity.primaryKeys;

        let pkExists = pks.every(pk => getObjectPath(result, map.map.mapPath.concat(pk.name)));
        if (!pkExists) setObjectPath(result, map.map.mapPath, null);
      }
    }
  }
}
