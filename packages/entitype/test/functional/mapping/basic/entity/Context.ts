import { DbCollection, EntitypeContext, IQueryable } from 'src';

import { ChildModel } from './ChildModel';
import { Model } from './Model';
import { OtherModel } from './OtherModel';

export class Context extends EntitypeContext {
  @DbCollection(Model)
  models: IQueryable<Model>;

  @DbCollection(ChildModel)
  childmodels: IQueryable<ChildModel>;

  @DbCollection(OtherModel)
  othermodels: IQueryable<OtherModel>;
}
