import { JoinTreeNode } from '../common/JoinTreeNode';
import { createBufferFromHex, isBufferConversionRequired, setObjectPath } from '../common/util';
import { ColumnData, RowData } from '../ioc/index';
import { QueryContext } from './QueryContext';

export class ResultMapper {

  constructor(private context: QueryContext) { }

  mapResult(dataResult: RowData[]) {
    if (this.context.count) {
      return +dataResult[0].count;
    }

    let resultArray = this.convertRowsToFlatObjects(dataResult, null);

    resultArray = this.conertFlatObjectsToEntities(resultArray);

    if (this.context.select)
      resultArray = resultArray.map(this.context.select.expression);

    if (this.context.first) return resultArray[0];
    return resultArray;
  }

  convertRowsToFlatObjects(data: RowData[], colData: ColumnData[]) {
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
        if (aliasPath.path) {
          let data = row[aliasPath.alias];
          let colInfo = this.context.getColumnInfoForPropertyPath(aliasPath.path);
          if (isBufferConversionRequired(colInfo, data))
            data = createBufferFromHex(colInfo, data as any);

          result = setObjectPath(result, aliasPath.path, data);
        }
      }
      resultArray[index] = result;
    }

    return resultArray;
  }

  conertFlatObjectsToEntities(resultArray: any[]) {
    let root = this.context.joinTreeRoot;

    let trackedObjects = [];

    for (let index = 0; index < resultArray.length; index++) {
      let result = resultArray[index];
      let trackedObject = this.conertFlatObjectsToEntitiesInner(root, result);

      // TODO: don't push duplicate entities
      if (!trackedObject.duplicate) trackedObjects.push(trackedObject.object);
    }

    return trackedObjects;
  }

  conertFlatObjectsToEntitiesInner(node: JoinTreeNode, objectValue: any): { object: any, duplicate: boolean } {
    if (objectValue == null) return { object: null, duplicate: false };

    let keys = node.entity.primaryKeys;

    let keyValues = keys.map(x => objectValue[x.name]);
    if (keyValues.every(x => x == null)) return { object: null, duplicate: false };

    let duplicate = true;
    let trackedObject = this.context.tracker.getTrackedValue(node.entity.type as any, keyValues);
    if (!trackedObject) {
      this.context.tracker.setTrackedValue(node.entity.type as any, keyValues, objectValue);
      trackedObject = objectValue;
      duplicate = false;
    }
    let retVal = { object: trackedObject, duplicate };

    for (let index = 0; index < node.childs.length; index++) {
      let child = node.childs[index];
      let currentValue = objectValue[child.pathPart];
      let { object: childValue, duplicate: duplicate } = this.conertFlatObjectsToEntitiesInner(child, currentValue);

      if (child.column.isArray) {
        if (!Array.isArray(trackedObject[child.pathPart])) {
          trackedObject[child.pathPart] = [];
        }

        if (childValue == null && !duplicate) continue;
        trackedObject[child.pathPart].push(childValue);
      }
      else {
        trackedObject[child.pathPart] = childValue;
      }
    }

    return retVal;
  }
}
