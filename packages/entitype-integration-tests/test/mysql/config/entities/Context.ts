import { DbCollection, EntitypeContext, IQueryable } from 'entitype';
import { ChildModel } from './ChildModel';
import { Model } from './Model';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(() => Model)
  models: IQueryable<Model>;


  @DbCollection(() => ChildModel)
  childModels: IQueryable<ChildModel>;
}
