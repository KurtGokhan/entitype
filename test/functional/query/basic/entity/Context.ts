import { IQueryable, EntitypeContext, DbCollection } from 'src';
import { Model } from './Model';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(Model)
  models: IQueryable<Model>;
}
