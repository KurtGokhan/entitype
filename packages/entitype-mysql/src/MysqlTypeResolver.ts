import { StandardTypeInfo } from 'entitype';
import { TypeResolver, TypeResolverAdapter } from 'entitype/dist/plugins';

@TypeResolver('mysql')
export class MysqlTypeResolver implements TypeResolverAdapter {
  dbTypeToStandardType(dbType: string): StandardTypeInfo {
    let dbTypeRegex = /(\w*)(\((.+)\))?/;
    let [, name, , args] = dbTypeRegex.exec(dbType);
    let argsMapped = args ? args.split(',').map(x => parseInt(x).toString() === x ? parseInt(x) : x) : [];

    return { name, arguments: argsMapped };
  }

  standardTypeToDbType(type: StandardTypeInfo): string {
    if (type.arguments && type.arguments.length)
      return `${type.name}(${type.arguments.filter(x => x != null).join(',')})`;
    return type.name;
  }
}
