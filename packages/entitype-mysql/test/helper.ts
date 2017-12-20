import { useConfiguration } from 'entitype';

useConfiguration({ adapter: 'mysql' });

export function multilineRegExp(regs: RegExp[], options?: string) {
  return new RegExp(regs.map(
    function (reg) { return reg.source; }
  ).join(''), options);
}
