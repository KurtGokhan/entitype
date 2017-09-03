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

    let columns = this.context.select.columns;
    let resultArray = dataResult.map(x => ({}));

    for (let index = 0; index < columns.length; index++) {
      let column = columns[index];
      let alias = this.context.getAliasForPath(column.path);

      for (let rowIndex = 0; rowIndex < dataResult.length; rowIndex++) {
        let row = dataResult[rowIndex];
        let data = row[alias.name];
        let target = resultArray[rowIndex];

        // Scalar
        if (column.mapPath.length === 0) {
          resultArray[rowIndex] = data;
        }
        else {
          for (let mapIndex = 0; mapIndex < column.mapPath.length - 1; mapIndex++) {
            let mapPart = column.mapPath[mapIndex];
            let childTarget = target[mapPart];
            if (!childTarget) childTarget = target[mapPart] = {};
            target = childTarget;
          }
          let lastPart = column.mapPath[column.mapPath.length - 1];
          target[lastPart] = data;
        }
      }
    }

    if (this.context.first) {
      return resultArray[0];
    }
    return resultArray;
  }
}
