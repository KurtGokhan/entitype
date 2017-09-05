import 'reflect-metadata';

import * as chai from 'chai';

chai.use(require('chai-string'));

export function multilineRegExp(regs: RegExp[], options?: string) {
  return new RegExp(regs.map(
    function (reg) { return reg.source; }
  ).join(''), options);
}
