import { expect } from 'chai';
import { NoopNamingStrategy } from '../../src/naming/NoopNamingStrategy';

describe('entitype-cli > Noop Naming Strategy', () => {
  let ns = new NoopNamingStrategy();
  let inputs = [
    'hello_world',
    'hello_worlds',
    'Hello_Worlds',
    'HelloWorld',
    'my-dependencies',
    'my.dependencies',
    'is.togetherForever'
  ];

  describe('entitype-cli > tableNameToEntityName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.mappingTableNameToEntityName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });

  describe('entitype-cli > mappingTableNameToEntityName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.mappingTableNameToEntityName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('entitype-cli > tableNameToEntityFileName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.tableNameToEntityFileName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('entitype-cli > tableNameToContextPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.tableNameToContextPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('entitype-cli > columnNameToPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.columnNameToPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('entitype-cli > databaseNameToContextFileName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.databaseNameToContextFileName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs.map(x => x + 'Context'));
    });
  });


  describe('entitype-cli > databaseNameToContextName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.databaseNameToContextName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs.map(x => x + 'Context'));
    });
  });

  describe('entitype-cli > manyToManyNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.manyToManyNavigationPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('entitype-cli > oneToManyNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.oneToManyNavigationPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('entitype-cli > oneToOneNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.oneToOneNavigationPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });



  describe('entitype-cli > manyToOneNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.manyToOneNavigationPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });

});
