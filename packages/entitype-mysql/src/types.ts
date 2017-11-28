// Reference: https://dev.mysql.com/doc/refman/5.7/en/data-types.html

export let typeMapping = new Map<string, Function>([
  ['int', Number],
  ['integer', Number],
  ['smallint', Number],
  ['mediumint', Number],
  ['bigint', Number],
  ['tinyint', Number],

  ['decimal', String],
  ['dec', String],

  ['fixed', Number],
  ['numberic', Number],
  ['float', Number],
  ['real', Number],
  ['double', Number],
  ['double precision', Number],

  ['date', Date],
  ['datetime', Date],
  ['time', String],
  ['year', Number],
  ['timestamp', Date],

  ['char', String],
  ['varchar', String],
  ['tinytext', Buffer],
  ['mediumtext', Buffer],
  ['text', Buffer],
  ['longtext', Buffer],

  ['bit', Buffer],
  ['binary', Buffer],
  ['varbinary', Buffer],
  ['tinyblob', Buffer],
  ['mediumblob', Buffer],
  ['blob', Buffer],
  ['longblob', Buffer],

  ['enum', String],
  ['set', String],

  ['json', Object],

  ['boolean', Boolean]
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
