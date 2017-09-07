import { expect } from 'chai';

import { ChildModel } from './entity/ChildModel';
import { OtherModel } from './entity/OtherModel';
import { Model } from './entity/Model';
import { assertEntities, assertColumns, assertForeignKeys } from './helper';

describe('decorators > reversed imports', async () => {

  it('should create and store entities', assertEntities);

  it('should create and store all columns', assertColumns);

  it('should create and store all foreign keys', assertForeignKeys);
});
