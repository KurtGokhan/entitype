import { expect } from 'chai';
import { multilineRegExp } from '../../helper';

import { Context } from './entity/Context';

describe('entitype-mysql > entitype > query > where > combine', async () => {
  it('should be able to combine multiple conditions with and', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name).isNull()
      .andWhere(x => x.id).between(5, 10)
      .andWhere(x => x.id).not.equals(6)
      .toList;
    let query = listNode.query;
    expect(query).to.match(multilineRegExp([
      /SELECT .* FROM model as t0 WHERE /,
      /\( \( t0.name IS NULL \) AND \( t0.id BETWEEN 5 AND 10 \) AND \( NOT t0.id = 6 \) \)/
    ], 'i'));
  });

  it('should be able to combine multiple conditions with or', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name).isNull()
      .or
      .where(x => x.id).between(5, 10)
      .toList;
    let query = listNode.query;
    expect(query).to.match(multilineRegExp([
      /SELECT .* FROM model as t0 WHERE \( \( t0.name IS NULL \) \) OR \( \( t0.id BETWEEN 5 AND 10 \) \)/
    ], 'i'));
  });


  it('should be able to combine multiple conditions with and/or', async () => {
    let ctx = new Context();
    let listNode = ctx.models
      .where(x => x.name).isNull()
      .or
      .where(x => x.id).between(5, 10)
      .andWhere(x => x.id).not.equals(6)
      .toList;
    let query = listNode.query;
    expect(query).to.match(multilineRegExp([
      /SELECT .* FROM model as t0 WHERE \( \( t0.name IS NULL \) \) OR \( \( t0.id BETWEEN 5 AND 10 \) AND \( NOT t0.id = 6 \) \)/
    ], 'i'));
  });
});
