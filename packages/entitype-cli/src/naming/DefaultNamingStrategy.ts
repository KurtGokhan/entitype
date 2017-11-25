import * as pluralize from 'pluralize';

import { NamingStrategy } from './NamingStrategy';

function splitIntoWords(value: string): string[] {
  let delimiters = ['_', '.', ',', ' ', '\n', '\t', '-'];
  let words = [];

  let builder = [];
  for (let i = 0; i < value.length; i++) {
    let previousChar = value[i - 1];
    let char = value[i];

    let charIsUpper = char.match(/[a-z]/i) && char.toUpperCase() === char;
    let charIsDelimiter = delimiters.some(x => x === char);
    let prevCharIsUpper = previousChar ? previousChar.match(/[a-z]/i) && previousChar.toUpperCase() === previousChar : true;
    let splitByChar = charIsUpper && !prevCharIsUpper;

    let split = false;

    if (i === 0) builder.push(char);
    else if (charIsDelimiter) split = true;
    else if (splitByChar) split = true;
    else builder.push(char);

    if (split) {
      words.push(builder.join(''));
      builder = [];
      if (splitByChar) builder.push(char);
    }
  }

  if (builder.length) words.push(builder.join(''));

  return words.filter(x => x);
}

function capitalize(word: string) {
  let array = Array.from(word.toLowerCase());
  array[0] = array[0].toUpperCase();
  return array.join('');
}

export class DefaultNamingStrategy implements NamingStrategy {
  tableNameToEntityName(tableName: string): string {
    let words = splitIntoWords(tableName).map(capitalize);
    words[words.length - 1] = pluralize.singular(words[words.length - 1]);

    return words.join('');
  }

  mappingTableNameToEntityName(tableName: string): string {
    return this.tableNameToEntityName(tableName);
  }

  tableNameToEntityFileName(tableName: string): string {
    let words = splitIntoWords(tableName).map(x => x.toLowerCase());
    words[words.length - 1] = pluralize.singular(words[words.length - 1]);

    return words.join('-');
  }

  tableNameToContextPropertyName(tableName: string): string {
    let words = splitIntoWords(tableName);
    let [first, ...tail] = words;
    words = [first.toLowerCase(), ...tail.map(capitalize)];
    words[words.length - 1] = pluralize.plural(words[words.length - 1]);

    return words.join('');
  }

  columnNameToPropertyName(columnName: string): string {
    let words = splitIntoWords(columnName);
    let [first, ...tail] = words;
    words = [first.toLowerCase(), ...tail.map(capitalize)];
    return words.join('');
  }

  oneToOneNavigationPropertyName(propName: string): string {
    let words = splitIntoWords(propName.replace(/_np$/, ''));
    if (words[words.length - 1].toLowerCase() === 'id') words.pop();
    else words.push('Reference');

    let [first, ...tail] = words;
    words = [first.toLowerCase(), ...tail.map(capitalize)];
    return words.join('');
  }

  oneToManyNavigationPropertyName(propName: string): string {
    let words = splitIntoWords(propName.replace(/_np$/, ''));
    if (words[words.length - 1].toLowerCase() === 'id') words.pop();

    let [first, ...tail] = words;
    words = [first.toLowerCase(), ...tail.map(capitalize)];
    words[words.length - 1] = pluralize.plural(words[words.length - 1]);
    return words.join('');
  }

  manyToOneNavigationPropertyName(propName: string): string {
    return this.oneToOneNavigationPropertyName(propName);
  }

  manyToManyNavigationPropertyName(propName: string): string {
    return this.oneToManyNavigationPropertyName(propName);
  }

  databaseNameToContextName(dbName: string): string {
    return this.tableNameToEntityName(dbName) + 'Context';
  }

  databaseNameToContextFileName(dbName: string): string {
    return this.tableNameToEntityFileName(dbName) + '-context';
  }
}
