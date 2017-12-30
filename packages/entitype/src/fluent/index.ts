import { ICollection } from './collection';
import { IQueryable } from './interfaces';

export * from './expressions';
export * from './interfaces';
export * from './functions';

/**
 * Used on the properties of a Context to describe a table.
 * The property must also be decorated with DbCollection decorator.
 * @example
 * ```typescript
 * people: DbSet<Person>;
 * ```
 */
export interface DbSet<EntityType> extends IQueryable<EntityType>, ICollection<EntityType> {
}
