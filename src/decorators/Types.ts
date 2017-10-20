// TODO:

let custom = function (type, ...args: any[]) {
  if (args && args.length) return `${type}(${args.join(',')})`;
  return type;
};

export const DbTypes = {
  varchar: function (length?: number | 'max' | undefined) {
    if (length) return `varchar(${length})`;
    return 'varchar';
  },
  float: function (m, d) {
    custom('float', m, d);
  },
  decimal: function (m, d) {
    custom('decimal', m, d);
  },
  custom: custom
};
