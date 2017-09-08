import { expect } from 'chai';
import { UnknownPropertyError } from 'src/errors/UnknownPropertyError';
import { Context } from './entity/Context';

describe('query > basic > error', async () => {
  it('should throw when trying to navigate to an unknown property', async () => {
    let ctx = new Context();
    expect(() => ctx.models.select(x => x.name.anchor).toList.query).to.throw(UnknownPropertyError);
  });
});
