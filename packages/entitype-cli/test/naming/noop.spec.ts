import { expect } from 'chai';
import { NoopNamingStrategy } from '../../src/naming/NoopNamingStrategy';

describe('Noop Naming Strategy', () => {
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

  describe('tableNameToEntityName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.mappingTableNameToEntityName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });

  describe('mappingTableNameToEntityName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.mappingTableNameToEntityName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('tableNameToEntityFileName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.tableNameToEntityFileName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('tableNameToContextPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.tableNameToContextPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('columnNameToPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.columnNameToPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('databaseNameToContextFileName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.databaseNameToContextFileName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs.map(x => x + 'Context'));
    });
  });


  describe('databaseNameToContextName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.databaseNameToContextName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs.map(x => x + 'Context'));
    });
  });

  describe('manyToManyNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.manyToManyNavigationPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('oneToManyNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.oneToManyNavigationPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });


  describe('oneToOneNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.oneToOneNavigationPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });



  describe('manyToOneNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.manyToOneNavigationPropertyName.bind(ns);
      let result = inputs.map(test);
      expect(result).to.eql(inputs);
    });
  });

});
