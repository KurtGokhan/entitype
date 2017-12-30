import { DataType, DeepPropertyExpression, PropertyMapExpression } from './expressions';

export interface ICollection<EntityType> {
  /**
  * Inserts a new entry to the database
  */
  insert(entry: EntityType): Promise<EntityType>;

  /**
   * Updates an entry or inserts if it does not exist in the database
   */
  persist(entry: EntityType): Promise<EntityType>;

  /**
   * Updates an entry and saves changes to the database
   */
  update(entry: Partial<EntityType>): Promise<EntityType>;
}
