import { expect } from 'chai';
import { DecoratorStorage } from 'entitype/src/common/DecoratorStorage';
import { EntityOptions } from 'entitype/src/decorators';
import { ObjectType } from 'entitype/src/fluent';

import { ImplicitlyNamedModel, NamedModel, NamedModelOpts, NamedModelParams } from './entity/Entities';


function checkEntityOptionValue<EntityType>(entityType: ObjectType<EntityType>, optionName: (keyof EntityOptions), expectedValue: any) {
  let entity = DecoratorStorage.getEntity(entityType);

  let actualValue = entity.options[optionName];

  expect(actualValue).to.be.equal(expectedValue);
}

function checkEntityPropertyValue<EntityType>(entityType: ObjectType<EntityType>, propName: (keyof DecoratorStorage.Entity), expectedValue: any) {
  let entity = DecoratorStorage.getEntity(entityType);

  let actualValue = entity[propName];

  expect(actualValue).to.be.equal(expectedValue);
}


describe('decorators > entity options', async () => {
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
