import { expect } from 'chai';
import { setupConfiguration } from '../../helper';
import { Context } from './entity/Context';

describe('entitype-mysql > query > where > with count', async () => {
  beforeEach(setupConfiguration);

  it('should be able to filter selection and take count', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name).isNull()
      .count;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT Count(*) as count FROM model as t0 WHERE ( ( t0.name IS NULL ) )`);
  });

  it('should be able to filter selection with not and take count', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name).not.isNull()
      .count;
    let query = listNode.query;
    expect(query).to.be.equalIgnoreCase(`SELECT Count(*) as count FROM model as t0 WHERE ( ( NOT t0.name IS NULL ) )`);
  });
});
