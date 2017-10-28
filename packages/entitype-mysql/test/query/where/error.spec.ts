import { expect } from 'chai';

import { Context } from './entity/Context';

describe('query > where > error', async () => {
  it('should throw when trying to navigate to an unknown property', async () => {
    let ctx = new Context();
    expect(() => ctx.models.where(x => x.date.getDate).gt(() => 5).count.query).to.throw(Error);
  });
});
