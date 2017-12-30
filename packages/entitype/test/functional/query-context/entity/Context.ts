import { DbCollection, DbSet, EntitypeContext } from '../../../../src';
import { ChildModel } from './ChildModel';
import { Model } from './Model';
import { OtherModel } from './OtherModel';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(() => Model)
  models: DbSet<Model>;

  @DbCollection(() => ChildModel)
  childmodels: DbSet<ChildModel>;

  @DbCollection(() => OtherModel)
  othermodels: DbSet<OtherModel>;
}
