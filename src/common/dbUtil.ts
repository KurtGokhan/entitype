export function mysql_real_escape_string(str: string, forLike: boolean = false) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case '\0':
        return '\\0';
      case '\x08':
        return '\\b';
      case '\x09':
        return '\\t';
      case '\x1a':
        return '\\z';
      case '\n':
        return '\\n';
      case '\r':
        return '\\r';
      case '"':
      case '\'':
      case '\\':
      case '%':
        if (forLike) return char;
        else return '\\' + char;
      default:
        return char;
    }
  });
}
export function valueAsDbString(value: any, forLike: boolean = false): string {
  while (typeof value === 'function')
    value = value();

  if (typeof value === 'undefined' || value == null)
    return 'NULL';

  if (typeof value === 'object') {
    if (value instanceof Date) {
      value = dateAsDbString;
    }
    else {
      value = JSON.stringify(value);
    }
  }

  if (typeof value === 'number')
    return value.toString();
  if (typeof value === 'string') {
    return `'${mysql_real_escape_string(value, forLike)}'`;
  }
  if (typeof value === 'boolean') {
    return (value ? 1 : 0).toString();
  }
  return value.toString();
}

function dateAsDbString(date: Date) {
  let YYYY = date.getFullYear().toString(),
    MM = (date.getMonth() + 1).toString(),
    DD = date.getDate().toString(),
    hh = date.getUTCHours().toString(),
    mm = date.getUTCMinutes().toString(),
    ss = date.getUTCSeconds().toString();
  return YYYY + '-'
    + (MM[1] ? MM : '0' + MM[0])
    + '-' + (DD[1] ? DD : '0' + DD[0])
    + ' ' + (hh[1] ? hh : '0' + hh[0])
    + ':' + (mm[1] ? mm : '0' + mm[0])
    + ':' + (ss[1] ? ss : '0' + ss[0]);
}
