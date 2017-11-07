import { expect } from 'chai';
import * as sinon from 'sinon';
import { MysqlDriver } from 'src';

import { ColumnMetadata, ForeignKeyMetadata } from '../../src';

describe('driver > runQuery', async () => {
  let mock;

  afterEach(() => mock.restore());

  it('should create entities succesfully', async () => {
    let connection = { query: async () => [], end: async () => { } };

    let tables = ['a', 'b'];
    let aColumns: ColumnMetadata[] = [
      { 'Field': 'id', 'Type': 'int(11)', 'Null': 'NO', 'Key': 'PRI', 'Default': null, 'Extra': 'auto_increment' },
      { 'Field': 'index_key', 'Type': 'varchar(50)', 'Null': 'NO', 'Key': 'MUL', 'Default': null, 'Extra': '' },
      { 'Field': 'uni_key', 'Type': 'varchar(50)', 'Null': 'YES', 'Key': 'UNI', 'Default': null, 'Extra': '' },
      { 'Field': 'col_with_default', 'Type': 'float', 'Null': 'YES', 'Key': '', 'Default': 5, 'Extra': '' }
    ];
    let bColumns: ColumnMetadata[] = [
      { 'Field': 'id', 'Type': 'int(11)', 'Null': 'NO', 'Key': 'PRI', 'Default': null, 'Extra': 'auto_increment' },
      { 'Field': 'a_id', 'Type': 'int(11)', 'Null': 'NO', 'Key': '', 'Default': null, 'Extra': '' }
    ];

    let fks: ForeignKeyMetadata[] = [
      { COLUMN_NAME: 'a_id', TABLE_NAME: 'b', CONSTRAINT_NAME: '', REFERENCED_COLUMN_NAME: 'id', REFERENCED_TABLE_NAME: 'a' }
    ];

    sinon.stub(connection, 'query')
      .withArgs('SHOW TABLES').returns(Promise.resolve([tables]))
      .withArgs('DESCRIBE `a`').returns(Promise.resolve([aColumns]))
      .withArgs('DESCRIBE `b`').returns(Promise.resolve([bColumns]))
      .withArgs(sinon.match(/.*INFORMATION_SCHEMA.KEY_COLUMN_USAGE.*/)).returns(Promise.resolve([fks]));

    mock = sinon.stub(require('mysql2/promise'), 'createConnection')
      .returns(Promise.resolve(connection));

    let [aEntity, bEntity] = await new MysqlDriver().getEntities(null);

    expect(aEntity).to.exist;
    expect(aEntity.dbName).to.eql(tables[0]);
    expect(aEntity.options.tableName).to.eql(tables[0]);
    expect(aEntity.primaryKeys.length).to.eql(1);

    expect(aEntity.properties[0].dbName).to.eql(aColumns[0].Field);
    expect(aEntity.properties[0].options.generated).to.be.true;
    expect(aEntity.properties[0].options.primaryKey).to.be.true;
    expect(aEntity.properties[0].options.type).to.eql({ name: 'int', arguments: [11] });

    expect(aEntity.properties[1].dbName).to.eql(aColumns[1].Field);
    expect(aEntity.properties[1].options.index).to.be.true;

    expect(aEntity.properties[2].dbName).to.eql(aColumns[2].Field);
    expect(aEntity.properties[2].options.unique).to.be.true;

    expect(aEntity.properties[3].dbName).to.eql(aColumns[3].Field);
    expect(aEntity.properties[3].options.type).to.eql({ name: 'float', arguments: [] });
    expect(aEntity.properties[3].options.default).to.eql(5);

    expect(aEntity.properties[4].isNavigationProperty).to.be.true;
    expect(aEntity.properties[4].foreignKey).to.exist;
    expect(aEntity.properties[4].foreignKey.owner.type).to.eql(bEntity.type);
    expect(aEntity.properties[4].type).to.exist.and.eql(bEntity.type);


    expect(bEntity).to.exist;
    expect(bEntity.dbName).to.eql(tables[1]);
    expect(bEntity.primaryKeys.length).to.eql(1);

    expect(bEntity.properties[0].dbName).to.eql(bColumns[0].Field);
    expect(bEntity.properties[0].options.generated).to.be.true;
    expect(bEntity.properties[0].options.primaryKey).to.be.true;
    expect(bEntity.properties[0].options.type).to.eql({ name: 'int', arguments: [11] });

    expect(bEntity.properties[1].dbName).to.eql(bColumns[1].Field);
    expect(bEntity.properties[1].isForeignKey).to.be.true;

    expect(bEntity.properties[2].isNavigationProperty).to.be.true;
    expect(bEntity.properties[2].foreignKey).to.exist;
    expect(bEntity.properties[2].foreignKey.column).to.eql(bColumns[1].Field);
    expect(bEntity.properties[2].foreignKey.owner.type).to.eql(bEntity.type);
    expect(bEntity.properties[2].type).to.exist.and.eql(aEntity.type);
  });
});
