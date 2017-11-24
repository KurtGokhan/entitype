// Reference: https://dev.mysql.com/doc/refman/5.7/en/data-types.html

export let typeMapping = new Map<string, Function>([
  ['int', Number],
  ['integer', Number],
  ['smallint', Number],
  ['tinyint', Number],
  ['mediumint', Number],
  ['bigint', Number],
  ['decimal', Number],
  ['dec', Number],
  ['fixed', Number],
  ['numberic', Number],
  ['float', Number],
  ['real', Number],
  ['double', Number],
  ['double precision', Number],
  ['bit', Number],

  ['date', Date],
  ['datetime', Date],
  ['time', Date],
  ['year', Date],
  ['timestamp', Date],

  ['char', String],
  ['varchar', String],
  ['binary', String],
  ['varbinary', String],
  ['blob', String],
  ['text', String],

  ['enum', String],
  ['set', String],

  ['json', Object]
]);

function parseType(type: string) {
  let dbTypeRegex = /(\w*)(\((.+)\))?/;
  let [, name, , args] = dbTypeRegex.exec(type);
  let argsMapped = args ? args.split(',').map(x => parseInt(x).toString() === x ? parseInt(x) : x) : [];

  return { name, arguments: argsMapped };
}

export function getConstructorForDatabaseType(dbType: string) {
  let type = parseType(dbType);
  return typeMapping.get(type.name.toLowerCase());
}
