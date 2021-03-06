import { expect } from 'chai';
import { EntitypeMetadata } from '../../../../src/common/EntitypeMetadata';
import { EntityOptions } from '../../../../src/decorators';
import { ObjectType } from '../../../../src/fluent';

import { ImplicitlyNamedModel, NamedModel, NamedModelOpts, NamedModelParams } from './entity/Entities';


function checkEntityOptionValue<EntityType>(entityType: ObjectType<EntityType>, optionName: (keyof EntityOptions), expectedValue: any) {
  let entity = EntitypeMetadata.getEntity(entityType);

  let actualValue = entity.options[optionName];

  expect(actualValue).to.be.equal(expectedValue);
}

function checkEntityPropertyValue<EntityType>(entityType: ObjectType<EntityType>, propName: (keyof EntitypeMetadata.Entity), expectedValue: any) {
  let entity = EntitypeMetadata.getEntity(entityType);

  let actualValue = entity[propName];

  expect(actualValue).to.be.equal(expectedValue);
}


describe('entitype > decorators > entity options', async () => {
  it('should correctly set name options', () => {
    checkEntityOptionValue(ImplicitlyNamedModel, 'tableName', 'ImplicitlyNamedModel');
    checkEntityOptionValue(NamedModel, 'tableName', 'TableName');
    checkEntityOptionValue(NamedModelOpts, 'tableName', 'ModelNamedWithOpts');
    checkEntityOptionValue(NamedModelParams, 'tableName', 'ModelNamedWithParams');

    checkEntityPropertyValue(ImplicitlyNamedModel, 'dbName', 'ImplicitlyNamedModel');
    checkEntityPropertyValue(NamedModel, 'dbName', 'TableName');
    checkEntityPropertyValue(NamedModelOpts, 'dbName', 'ModelNamedWithOpts');
    checkEntityPropertyValue(NamedModelParams, 'dbName', 'ModelNamedWithParams');

  });
});
