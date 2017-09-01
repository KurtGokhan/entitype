import { expect } from 'chai';
import { DbSet } from 'src/collections/DbSet';

import { UnknownPropertyError } from 'src/errors/UnknownPropertyError';
import { Model } from './entity/Model';

describe('query > where > error', async () => {
  it('should throw when trying to navigate to an unknown property', async () => {
    let ctx = new DbSet(Model);
    expect(() => ctx.where(x => x.date.getDate().gt(() => 5)).count.query).to.throw(UnknownPropertyError);
  });
});
