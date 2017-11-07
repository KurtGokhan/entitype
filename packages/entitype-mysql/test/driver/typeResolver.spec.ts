import { expect, spy } from 'chai';
import { MysqlTypeResolver } from 'src';

describe('driver > typeResolver', async () => {
  it('should convert db type to standard type correctly', async () => {
    let rs = new MysqlTypeResolver();
    expect(rs.dbTypeToStandardType('varchar')).to.eql({ name: 'varchar', arguments: [] });
    expect(rs.dbTypeToStandardType('varchar(52)')).to.eql({ name: 'varchar', arguments: [52] });

    expect(rs.dbTypeToStandardType('float')).to.eql({ name: 'float', arguments: [] });
    expect(rs.dbTypeToStandardType('float(5)')).to.eql({ name: 'float', arguments: [5] });
    expect(rs.dbTypeToStandardType('float(5,2)')).to.eql({ name: 'float', arguments: [5, 2] });

    expect(rs.dbTypeToStandardType('geometry')).to.eql({ name: 'geometry', arguments: [] });

    expect(rs.dbTypeToStandardType(`enum('enum1','enum2','enum3')`))
      .to.eql({ name: 'enum', arguments: [`'enum1'`, `'enum2'`, `'enum3'`] });
  });

  it('should convert standard type to db type correctly', async () => {
    let rs = new MysqlTypeResolver();
    expect(rs.standardTypeToDbType({ name: 'varchar', arguments: [] })).to.eql('varchar');
    expect(rs.standardTypeToDbType({ name: 'varchar', arguments: [52] })).to.eql('varchar(52)');

    expect(rs.standardTypeToDbType({ name: 'float', arguments: [] })).to.eql('float');
    expect(rs.standardTypeToDbType({ name: 'float', arguments: [5] })).to.eql('float(5)');
    expect(rs.standardTypeToDbType({ name: 'float', arguments: [5, 2] })).to.eql('float(5,2)');

    expect(rs.standardTypeToDbType({ name: 'geometry', arguments: [] })).to.eql('geometry');

    expect(rs.standardTypeToDbType({ name: 'enum', arguments: [`'enum1'`, `'enum2'`, `'enum3'`] }))
      .to.eql(`enum('enum1','enum2','enum3')`);
  });
});
