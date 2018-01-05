import { DbCollection, DbSet, EntitypeContext } from 'entitype';

import { Model } from './Model';
import { OtherModel } from './OtherModel';

export class Context extends EntitypeContext {

  @DbCollection(() => Model)
  models: DbSet<Model>;

  @DbCollection(() => OtherModel)
  othermodels: DbSet<OtherModel>;
}
