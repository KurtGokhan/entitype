import { useConfiguration } from 'entitype';

export function setupConfiguration() {
  require('../src');
  useConfiguration({ adapter: 'websql' });
}

export function multilineRegExp(regs: RegExp[], options?: string) {
  return new RegExp(regs.map(
    function (reg) { return reg.source; }
  ).join(''), options);
}
