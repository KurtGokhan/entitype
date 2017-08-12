import { Error } from 'tslint/lib/error';
import { IFiltered, IGrouped, IIncludable, IOrderable, IOrdered, IQueryable } from '../fluent/interfaces/types';
import { DecoratorStorage } from 'src/context/DecoratorStorage';

export class DbSet<EntityType extends Function> implements IQueryable<EntityType> {
  entity: DecoratorStorage.Entity;

  toList: { (): Promise<EntityType[]>; query: string; };
  first: { (): Promise<EntityType>; query: string; };
  count: { (): Promise<number>; query: string; };


  constructor(entityType: EntityType) {
    this.entity = DecoratorStorage.getEntity(entityType);

    this.toList = this.toListQuery();
  }

  include(): IIncludable<EntityType> {
    throw new Error('Method not implemented.');
  }
  groupBy(): IGrouped<EntityType> {
    throw new Error('Method not implemented.');
  }
  select(): IOrderable<EntityType> {
    throw new Error('Method not implemented.');
  }
  orderByAscending(): IOrdered<EntityType> {
    throw new Error('Method not implemented.');
  }
  orderByDescending(): IOrdered<EntityType> {
    throw new Error('Method not implemented.');
  }
  where(): IFiltered<EntityType> {
    throw new Error('Method not implemented.');
  }

  private toListQuery(): { (): Promise<EntityType[]>; query: string; } {
    let self = this;
    let ret = () => {
      console.log(ret['query']);
      return [];
    };

    Object.defineProperty(ret, 'query', {
      get() {
        return 'Select * from ' + self.entity.dbName;
      }
    });

    return ret as any;
  }
}
