import { DbCollection, DbSet, EntitypeContext } from 'entitype';
import { ChildModel } from './ChildModel';
import { Model } from './Model';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(() => Model)
  models: DbSet<Model>;


  @DbCollection(() => ChildModel)
  childModels: DbSet<ChildModel>;
}
