import { DbSet } from 'src/collections/DbSet';
import { EntitypeContext } from 'src/context/EntitypeContext';
import { DbCollection } from 'src/decorators/DbCollection';

import { Model } from './Model';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(Model)
  models: DbSet<Model>;
}
