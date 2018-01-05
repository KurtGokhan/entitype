import { DbCollection, DbSet, EntitypeContext } from 'entitype';

import { Model } from './Model';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(() => Model)
  models: DbSet<Model>;
}
