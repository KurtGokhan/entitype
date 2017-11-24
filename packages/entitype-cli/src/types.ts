export let typeMap = new Map<Function, string>([
  [Number, 'number'],
  [String, 'string'],
  [Boolean, 'boolean'],
  [Buffer, 'Buffer'],
  [Date, 'Date'],
  [Object, 'object']
]);

export function getTypeName(typeConstructor: Function) {
  return typeMap.get(typeConstructor) || 'any';
}
