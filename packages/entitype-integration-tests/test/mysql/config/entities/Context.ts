import { Model } from './Model';
import { ChildModel } from './ChildModel';
import { EntitypeContext, DbCollection, IQueryable } from 'entitype';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(Model)
  models: IQueryable<Model>;


  @DbCollection(ChildModel)
  childModels: IQueryable<ChildModel>;
}
