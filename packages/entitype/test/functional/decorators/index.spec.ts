import { expect } from 'chai';

import { Model } from './entity/Model';
import { ChildModel } from './entity/ChildModel';
import { OtherModel } from './entity/OtherModel';
import { assertEntities, assertColumns, assertForeignKeys } from './helper';

describe('decorators', async () => {

  it('should create and store entities', assertEntities);

  it('should create and store all columns', assertColumns);

  it('should create and store all foreign keys', assertForeignKeys);
});
