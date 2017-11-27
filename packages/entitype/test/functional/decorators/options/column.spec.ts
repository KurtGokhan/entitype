import { expect } from 'chai';
import { DecoratorStorage } from 'src/common/DecoratorStorage';
import { ColumnOptions } from 'src/decorators';

import { Model } from './entity/Model';


let entity = DecoratorStorage.getEntity(Model);
function checkPropertyOptionValue(propName: (keyof Model), optionName: (keyof ColumnOptions), expectedValue: any) {
  let prop = entity.properties.find(x => x.name === propName);

  let actualValue = prop.options[optionName];

  expect(actualValue).to.eql(expectedValue);
}


describe('decorators > column options', async () => {
  it('should correctly set nullable options', () => {
    checkPropertyOptionValue('nullable', 'nullable', true);
    checkPropertyOptionValue('nullable_imply', 'nullable', true);
    checkPropertyOptionValue('nullable_opts', 'nullable', true);
    checkPropertyOptionValue('not_nullable', 'nullable', false);
    checkPropertyOptionValue('empty', 'nullable', true);
  });


  it('should correctly set index options', () => {
    checkPropertyOptionValue('index', 'index', true);
    checkPropertyOptionValue('index_imply', 'index', true);
    checkPropertyOptionValue('index_opts', 'index', true);
    checkPropertyOptionValue('not_index', 'index', false);
    checkPropertyOptionValue('empty', 'index', false);
  });


  it('should correctly set unique options', () => {
    checkPropertyOptionValue('unique', 'unique', true);
    checkPropertyOptionValue('unique_imply', 'unique', true);
    checkPropertyOptionValue('unique_opts', 'unique', true);
    checkPropertyOptionValue('not_unique', 'unique', false);
    checkPropertyOptionValue('empty', 'unique', false);
  });


  it('should correctly set pk options', () => {
    checkPropertyOptionValue('pk', 'primaryKey', true);
    checkPropertyOptionValue('pk', 'generated', false);

    checkPropertyOptionValue('pk_generated', 'primaryKey', true);
    checkPropertyOptionValue('pk_generated', 'generated', true);

    checkPropertyOptionValue('pk_opts', 'primaryKey', true);
    checkPropertyOptionValue('pk_opts', 'generated', false);

    checkPropertyOptionValue('empty', 'primaryKey', false);
    checkPropertyOptionValue('empty', 'generated', false);
  });


  it('should correctly set name options', () => {
    checkPropertyOptionValue('named', 'columnName', 'customName');
    checkPropertyOptionValue('named_param', 'columnName', 'customName_param');
    checkPropertyOptionValue('named_opts', 'columnName', 'customName_opts');
    checkPropertyOptionValue('empty', 'columnName', 'empty');
  });


  it('should correctly set default options', () => {
    checkPropertyOptionValue('with_default', 'default', 'default-string-value');
    checkPropertyOptionValue('with_default_opts', 'default', 'default-string-value');
    checkPropertyOptionValue('empty', 'default', undefined);
  });


  it('should correctly set type options', () => {
    checkPropertyOptionValue('typed', 'type', 'float');
    checkPropertyOptionValue('typed_opts', 'type', 'float');
    checkPropertyOptionValue('typed_custom', 'type', 'hello(5,3)');
    checkPropertyOptionValue('typed_custom_implicit', 'type', 'helloagain(7,9)');
    checkPropertyOptionValue('empty', 'type', undefined);
  });


  it('should correctly set composite options', () => {
    checkPropertyOptionValue('typed_and_named', 'type', 'float');
    checkPropertyOptionValue('typed_and_named', 'columnName', 'customName_typed');

    checkPropertyOptionValue('typed_and_named_opts', 'type', 'float');
    checkPropertyOptionValue('typed_and_named_opts', 'columnName', 'customName_typed_opts');

    checkPropertyOptionValue('typed_and_named_param', 'type', 'float');
    checkPropertyOptionValue('typed_and_named_param', 'columnName', 'customName_typed_param');
  });

  it('should correctly set multiple primary keys', () => {
    let pk = entity.primaryKeys;

    expect(pk.length).to.be.eql(3);
    expect(pk[0].name).to.be.eql('pk');
    expect(pk[1].name).to.be.eql('pk_opts');
    expect(pk[2].name).to.be.eql('pk_generated');
  });
});
