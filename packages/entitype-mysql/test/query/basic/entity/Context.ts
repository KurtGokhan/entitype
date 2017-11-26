import { DbCollection, EntitypeContext, IQueryable } from 'entitype';

import { Model } from './Model';
import { OtherModel } from './OtherModel';

export class Context extends EntitypeContext {

  @DbCollection(Model)
  models: IQueryable<Model>;

  @DbCollection(OtherModel)
  othermodels: IQueryable<OtherModel>;
}
