import { ObjectType } from '../fluent/index';

export type TypeResolver<T> = ForwardRef<T> | ((...args: any[]) => ObjectType<T>);

export class ForwardRef<T> {
  private readonly reference: () => ObjectType<T>;

  constructor(reference: () => ObjectType<T>) {
    this.reference = reference || (() => null);
  }

  get type(): ObjectType<T> {
    return this.reference();
  }
}

export function resolveType<T>(type: TypeResolver<T>): ForwardRef<T> {
  if (type instanceof ForwardRef) {
    return type;
  }
  return new ForwardRef(type as any);
}
