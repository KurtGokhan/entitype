import 'reflect-metadata';
import 'src';

import * as chai from 'chai';
import { useConfiguration } from 'entitype';
import { createConnection } from 'mysql2/promise';
import { MysqlConnectionOptions } from 'src/MysqlConnectionOptions';

let cc = createConnection;

chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));

export const connectionOptions = require('./config.json') as MysqlConnectionOptions;

useConfiguration(connectionOptions);

export function multilineRegExp(regs: RegExp[], options?: string) {
  return new RegExp(regs.map(
    function (reg) { return reg.source; }
  ).join(''), options);
}
