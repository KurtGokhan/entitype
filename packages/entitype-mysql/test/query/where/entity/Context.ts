import { DbCollection, EntitypeContext, IQueryable } from 'entitype';

import { Model } from './Model';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(Model)
  models: IQueryable<Model>;
}
