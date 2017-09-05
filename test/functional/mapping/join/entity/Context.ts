import { IQueryable, EntitypeContext, DbCollection } from 'src';

import { Model } from './Model';
import { ChildModel } from './ChildModel';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(Model)
  models: IQueryable<Model>;

  @DbCollection(ChildModel)
  childmodels: IQueryable<ChildModel>;
}
