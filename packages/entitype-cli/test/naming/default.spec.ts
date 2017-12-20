import { expect } from 'chai';
import { DefaultNamingStrategy } from '../../src/naming/DefaultNamingStrategy';

describe('entitype-cli > Default Naming Strategy', () => {
  let ns = new DefaultNamingStrategy();

  describe('entitype-cli > tableNameToEntityName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.tableNameToEntityName.bind(ns);
      expect(test('hello_world')).to.eql('HelloWorld');
      expect(test('hello_worlds')).to.eql('HelloWorld');
      expect(test('Hello_Worlds')).to.eql('HelloWorld');
      expect(test('HelloWorld')).to.eql('HelloWorld');
      expect(test('my-dependencies')).to.eql('MyDependency');
      expect(test('my.dependencies')).to.eql('MyDependency');
      expect(test('is.togetherForever')).to.eql('IsTogetherForever');
    });
  });

  describe('entitype-cli > mappingTableNameToEntityName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.mappingTableNameToEntityName.bind(ns);
      expect(test('hello_world')).to.eql('HelloWorld');
      expect(test('hello_worlds')).to.eql('HelloWorld');
      expect(test('Hello_Worlds')).to.eql('HelloWorld');
      expect(test('HelloWorld')).to.eql('HelloWorld');
      expect(test('my-dependencies')).to.eql('MyDependency');
      expect(test('my.dependencies')).to.eql('MyDependency');
      expect(test('is.togetherForever')).to.eql('IsTogetherForever');
    });
  });


  describe('entitype-cli > tableNameToEntityFileName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.tableNameToEntityFileName.bind(ns);
      expect(test('hello_world')).to.eql('hello-world');
      expect(test('hello_worlds')).to.eql('hello-world');
      expect(test('Hello_Worlds')).to.eql('hello-world');
      expect(test('HelloWorld')).to.eql('hello-world');
      expect(test('my-dependencies')).to.eql('my-dependency');
      expect(test('my.dependencies')).to.eql('my-dependency');
      expect(test('is.togetherForever')).to.eql('is-together-forever');
      expect(test('ONE_WORD')).to.eql('one-word');
    });
  });


  describe('entitype-cli > tableNameToContextPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.tableNameToContextPropertyName.bind(ns);
      expect(test('hello_world')).to.eql('helloWorlds');
      expect(test('hello_worlds')).to.eql('helloWorlds');
      expect(test('Hello_Worlds')).to.eql('helloWorlds');
      expect(test('HelloWorld')).to.eql('helloWorlds');
      expect(test('my-dependencies')).to.eql('myDependencies');
      expect(test('my.dependencies')).to.eql('myDependencies');
      expect(test('is.togetherForever')).to.eql('isTogetherForevers');
      expect(test('ONE_WORD')).to.eql('oneWords');
    });
  });


  describe('entitype-cli > columnNameToPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.columnNameToPropertyName.bind(ns);
      expect(test('hello_world')).to.eql('helloWorld');
      expect(test('hello_worlds')).to.eql('helloWorlds');
      expect(test('Hello_Worlds')).to.eql('helloWorlds');
      expect(test('HelloWorld')).to.eql('helloWorld');
      expect(test('my-dependencies')).to.eql('myDependencies');
      expect(test('my.dependencies')).to.eql('myDependencies');
      expect(test('is.togetherForever')).to.eql('isTogetherForever');
      expect(test('ONE_WORD')).to.eql('oneWord');
    });
  });


  describe('entitype-cli > databaseNameToContextFileName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.databaseNameToContextFileName.bind(ns);
      expect(test('hello_world')).to.eql('hello-world-context');
      expect(test('hello_worlds')).to.eql('hello-world-context');
      expect(test('Hello_Worlds')).to.eql('hello-world-context');
      expect(test('HelloWorld')).to.eql('hello-world-context');
      expect(test('my-dependencies')).to.eql('my-dependency-context');
      expect(test('my.dependencies')).to.eql('my-dependency-context');
      expect(test('is.togetherForever')).to.eql('is-together-forever-context');
      expect(test('ONE_WORD')).to.eql('one-word-context');
    });
  });


  describe('entitype-cli > databaseNameToContextName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.databaseNameToContextName.bind(ns);
      expect(test('hello_world')).to.eql('HelloWorldContext');
      expect(test('hello_worlds')).to.eql('HelloWorldContext');
      expect(test('Hello_Worlds')).to.eql('HelloWorldContext');
      expect(test('HelloWorld')).to.eql('HelloWorldContext');
      expect(test('my-dependencies')).to.eql('MyDependencyContext');
      expect(test('my.dependencies')).to.eql('MyDependencyContext');
      expect(test('is.togetherForever')).to.eql('IsTogetherForeverContext');
    });
  });

  describe('entitype-cli > manyToManyNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.manyToManyNavigationPropertyName.bind(ns);
      expect(test('hello_world')).to.eql('helloWorlds');
      expect(test('hello_world_id')).to.eql('helloWorlds');
      expect(test('hello_worlds-id')).to.eql('helloWorlds');
      expect(test('Hello_Worlds.id')).to.eql('helloWorlds');
      expect(test('HelloWorld')).to.eql('helloWorlds');
      expect(test('my-dependency')).to.eql('myDependencies');
      expect(test('my-dependencies')).to.eql('myDependencies');
      expect(test('my.dependencies')).to.eql('myDependencies');
      expect(test('is.togetherForever')).to.eql('isTogetherForevers');
      expect(test('ONE_WORD')).to.eql('oneWords');
    });
  });


  describe('entitype-cli > oneToManyNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.oneToManyNavigationPropertyName.bind(ns);
      expect(test('hello_world')).to.eql('helloWorlds');
      expect(test('hello_world_id')).to.eql('helloWorlds');
      expect(test('hello_worlds-id')).to.eql('helloWorlds');
      expect(test('Hello_Worlds.id')).to.eql('helloWorlds');
      expect(test('HelloWorld')).to.eql('helloWorlds');
      expect(test('my-dependency')).to.eql('myDependencies');
      expect(test('my-dependencies')).to.eql('myDependencies');
      expect(test('my.dependencies')).to.eql('myDependencies');
      expect(test('is.togetherForever')).to.eql('isTogetherForevers');
      expect(test('ONE_WORD')).to.eql('oneWords');
    });
  });


  describe('entitype-cli > oneToOneNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.oneToOneNavigationPropertyName.bind(ns);
      expect(test('hello_world')).to.eql('helloWorldReference');
      expect(test('hello_world_id')).to.eql('helloWorld');
      expect(test('hello_worlds-id')).to.eql('helloWorlds');
      expect(test('Hello_Worlds.id')).to.eql('helloWorlds');
      expect(test('HelloWorld')).to.eql('helloWorldReference');
      expect(test('my-dependency')).to.eql('myDependencyReference');
      expect(test('my-dependencies')).to.eql('myDependenciesReference');
      expect(test('my.dependencies')).to.eql('myDependenciesReference');
      expect(test('is.togetherForever')).to.eql('isTogetherForeverReference');
      expect(test('ONE_WORD')).to.eql('oneWordReference');
    });
  });



  describe('entitype-cli > manyToOneNavigationPropertyName', () => {
    it('should work', () => {
      let test: (value: string) => string = ns.manyToOneNavigationPropertyName.bind(ns);
      expect(test('hello_world')).to.eql('helloWorldReference');
      expect(test('hello_world_id')).to.eql('helloWorld');
      expect(test('hello_worlds-id')).to.eql('helloWorlds');
      expect(test('Hello_Worlds.id')).to.eql('helloWorlds');
      expect(test('HelloWorld')).to.eql('helloWorldReference');
      expect(test('my-dependency')).to.eql('myDependencyReference');
      expect(test('my-dependencies')).to.eql('myDependenciesReference');
      expect(test('my.dependencies')).to.eql('myDependenciesReference');
      expect(test('is.togetherForever')).to.eql('isTogetherForeverReference');
      expect(test('ONE_WORD')).to.eql('oneWordReference');
    });
  });

});
