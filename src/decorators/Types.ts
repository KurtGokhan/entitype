// Reference: https://dev.mysql.com/doc/refman/5.7/en/data-types.html
// TODO:

let buildType = function (type, ...args: any[]) {
  if (args && args.length)
    return `${type}(${args.filter(x => x != null).join(',')})`;
  return type;
};

export const DbTypes = {
  boolean: 'boolean',
  bit: function (size?: number) {
    return buildType('bit', size);
  },
  int: function (size?: number) {
    return buildType('int', size);
  },

  decimal: function (m?: number, d?: number) {
    return buildType('decimal', m, d);
  },

  double: function (m?: number, d?: number) {
    return buildType('double', m, d);
  },
  float: function (m?: number, d?: number) {
    return buildType('float', m, d);
  },

  date: 'date',
  year: 'year',
  time: function (fsp?: number) {
    return buildType('time', fsp);
  },
  datetime: function (fsp?: number) {
    return buildType('datetime', fsp);
  },
  timestamp: function (fsp?: number) {
    return buildType('timestamp', fsp);
  },




  char: function (length?: number | 'max' | undefined) {
    return buildType('char', length);
  },
  varchar: function (length?: number | 'max' | undefined) {
    return buildType('varchar', length);
  },
  nchar: function (length?: number | 'max' | undefined) {
    return buildType('nchar', length);
  },
  nVarchar: function (length?: number | 'max' | undefined) {
    return buildType('nvarchar', length);
  },

  binary: function (size?: number) {
    return buildType('binary', size);
  },
  varbinary: function (size?: number) {
    return buildType('varbinary', size);
  },

  text: function (size?: number) {
    return buildType('text', size);
  },

  blob: function (size?: number) {
    return buildType('blob', size);
  },

  enum: function (...values: string[]) {
    return buildType('enum', ...values.map(x => `'` + x + `'`));
  },
  set: function (...values: string[]) {
    return buildType('set', ...values.map(x => `'` + x + `'`));
  },

  json: 'json',
  custom: buildType
};
