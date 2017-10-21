import { expect } from 'chai';
import { EntityOptions } from 'src/decorators';
import { ObjectType } from 'src/fluent';
import { DecoratorStorage } from 'src/storage/DecoratorStorage';

import { ImplicitlyNamedModel, NamedModel, NamedModelOpts, NamedModelParams } from './entity/Entities';


function checkEntityOptionValue<EntityType>(entityType: ObjectType<EntityType>, optionName: (keyof EntityOptions), expectedValue: any) {
  let entity = DecoratorStorage.getEntity(entityType);

  let actualValue = entity.options[optionName];

  expect(actualValue).to.be.equal(expectedValue);
}


describe('decorators > entity options', async () => {
  it('should correctly set name options', () => {
    checkEntityOptionValue(ImplicitlyNamedModel, 'tableName', 'ImplicitlyNamedModel');
    checkEntityOptionValue(NamedModel, 'tableName', 'TableName');
    checkEntityOptionValue(NamedModelOpts, 'tableName', 'ModelNamedWithOpts');
    checkEntityOptionValue(NamedModelParams, 'tableName', 'ModelNamedWithParams');

  });
});
