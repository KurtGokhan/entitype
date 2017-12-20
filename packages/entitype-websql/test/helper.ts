import { useConfiguration } from 'entitype';

useConfiguration({ adapter: 'websql' });

export function multilineRegExp(regs: RegExp[], options?: string) {
  return new RegExp(regs.map(
    function (reg) { return reg.source; }
  ).join(''), options);
}
