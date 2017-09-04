import { Model } from './Model';
import { ChildModel } from './ChildModel';
import { EntitypeContext, DbCollection, DbSet } from 'entitype';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(Model)
  models: DbSet<Model>;


  @DbCollection(ChildModel)
  childModels: DbSet<Model>;
}
