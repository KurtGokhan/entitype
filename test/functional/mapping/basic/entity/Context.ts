import { IQueryable, EntitypeContext, DbCollection } from 'src';
import { Model } from './Model';
import { ChildModel } from './ChildModel';
import { OtherModel } from './OtherModel';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(Model)
  models: IQueryable<Model>;

  @DbCollection(ChildModel)
  childmodels: IQueryable<ChildModel>;

  @DbCollection(OtherModel)
  othermodels: IQueryable<OtherModel>;
}
