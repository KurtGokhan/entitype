import { QueryContext } from './QueryContext';
import { CountCommand } from '../command/command-types/CountCommand';
import { CommandType } from '../command/CommandType';
import { SelectCommand } from '../command/command-types/SelectCommand';
import { Command } from '../command/Command';
import { DecoratorStorage } from '../storage/DecoratorStorage';
export class ResultMapper {

  constructor(private context: QueryContext) { }

  mapResult(dataResult: { [key: string]: any }[]) {
    if (this.context.count) {
      return +dataResult[0].count;
    }

    let columns = this.context.selectedColumns;
    let resultArray = this.getStructure(dataResult.length);

    for (let index = 0; index < columns.length; index++) {
      let column = columns[index];
      let alias = this.context.getAliasForColumn(column.path);

      for (let rowIndex = 0; rowIndex < dataResult.length; rowIndex++) {
        let row = dataResult[rowIndex];
        let data = row[alias];
        let target = resultArray[rowIndex];

        for (let mapIndex = 0; mapIndex < column.mapPath.length - 1; mapIndex++) {
          let mapPart = column.mapPath[mapIndex];
          target = target[mapPart];
        }
        let lastPart = column.mapPath[column.mapPath.length - 1];
        if (lastPart) target[lastPart] = data;
        else resultArray[rowIndex] = data;
      }
    }

    if (this.context.first) {
      return resultArray[0];
    }
    return resultArray;
  }

  getStructure(count: number) {
    let structure = this.context.selectStructure;
    let resultArray = [];

    for (let index = 0; index < count; index++) {
      let result;

      for (let stIndex = 0; stIndex < structure.length; stIndex++) {
        let st = structure[stIndex];
        let value;
        if (st.isArray) value = [];
        else if (st.isObject) value = {};
        else value = st.value;

        let target = result;

        for (let mapIndex = 0; mapIndex < st.mapPath.length - 1; mapIndex++) {
          let mapPart = st.mapPath[mapIndex];
          let childTarget = target[mapPart];
          target = childTarget;
        }

        let lastPart = st.mapPath[st.mapPath.length - 1];
        if (lastPart) target[lastPart] = value;
        else target = value;

        if (!result) result = target;
      }

      resultArray.push(result);
    }

    return resultArray;
  }
}
