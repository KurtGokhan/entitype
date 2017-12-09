import 'reflect-metadata';
import 'src';

import * as chai from 'chai';
import { useConfiguration } from 'entitype';

chai.use(require('chai-spies'));
chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));

useConfiguration({ adapter: 'websql' });

export function multilineRegExp(regs: RegExp[], options?: string) {
  return new RegExp(regs.map(
    function (reg) { return reg.source; }
  ).join(''), options);
}
