import { DefaultColumnOptions } from 'entitype';
import { DecoratorStorage } from 'entitype/dist/common/DecoratorStorage';
import * as fs from 'fs-extra';
import { Question, Questions } from 'inquirer';
import * as os from 'os';
import * as path from 'path';

import { getConfiguration, getDriverAdapter } from './configuration';
import { DefaultNamingStrategy } from './naming/DefaultNamingStrategy';
import { NamingStrategy } from './naming/NamingStrategy';
import { getTypeName } from './types';

export type PullOptions = {
  options: {
    interactive?: boolean;
    config?: string;
    index?: boolean;
  };
  output: string;
};

type ClassDefinition = {
  className: string;
  fileName: string;
};

type ContextDefinition = ClassDefinition & {
  databaseName: string;
};

type EntityDefinition = ClassDefinition & {
  tableName: string;
  contextPropertyName: string;
  isMappingEntity: boolean;
  entity: DecoratorStorage.Entity;
  propertyDefinitions: PropertyDefinition[];
};

type PropertyDefinition = {
  propertyName: string;
  columnName: string;
  decoratorType: 'Column' | 'OneToOne' | 'OneToMany' | 'ManyToOne' | 'ManyToMany';
};

type Context = { entitypeContext?: ContextDefinition, entities?: EntityDefinition[] };

export type InteractionCallback = (x: any) => (boolean[] | string[]);

export async function pull(options: PullOptions, interaction?: InteractionCallback) {
  if (options.options.interactive && !interaction)
    throw new Error('An interaction callback must be defined in order for pull method to act interactively.');

  await new Pull(options, interaction).execute();
}

function compareByFileName(a: { fileName: string }, b: { fileName: string }) {
  if (a.fileName < b.fileName) return -1;
  if (a.fileName > b.fileName) return 1;
  return 0;
}

class Pull {
  config: any;
  namingStrategy: NamingStrategy = new DefaultNamingStrategy();

  constructor(private options: PullOptions, private interaction?: InteractionCallback) { }

  async execute() {
    this.config = await getConfiguration(this.options.options.config);

    let adapterName = this.config.adapter;
    let adapter = await getDriverAdapter(adapterName);

    let entities = await adapter.getEntities(this.config);
    await this.resolveEntityRelationships(entities);

    let definitions = await this.createContextDefinitions(entities);

    await this.createEntityFiles(this.options, definitions);
    await this.createContextFile(this.options, definitions);
    if (this.options.options.index) this.createIndexFile(this.options, definitions);
  }


  private async resolveEntityRelationships(entities: DecoratorStorage.Entity[]) {
    await this.resolveManyToMany(entities);
    await this.resolveOneToManyOrOneToOne(entities);
  }

  private async resolveOneToManyOrOneToOne(entities: DecoratorStorage.Entity[]) {
    const choices = ['One To One', 'One To Many'];

    let allProperties = entities.map(x => x.properties).reduce((a, b) => a.concat(b));
    let fkProperties = allProperties.filter(x => x.isForeignKey && x.isColumn);

    let fkMappings = fkProperties.map(fk => {
      let refColumns = allProperties.filter(y =>
        y.foreignKey &&
        y.foreignKey.owner.type === fk.parent.type &&
        y.foreignKey.column === fk.dbName);
      return {
        prop: fk,
        leftColumn: refColumns[0],
        rightColumn: refColumns[1]
      };
    }).filter(x => x.leftColumn && x.rightColumn);

    let answers: any[] = fkMappings.map(x => {
      if (x.prop.options.unique || x.prop.options.primaryKey) return choices[0];
      else return choices[1];
    });

    if (this.options.options.interactive) {
      let questions: Questions = fkMappings.map((x, i) => ({
        type: 'list',
        name: i.toString(),
        message: `What is the relationship between the tables, '${x.leftColumn.parent.dbName}' and '${x.rightColumn.parent.dbName}'?`,
        choices
      }));

      answers = await this.interaction(questions);
    }

    for (let index = 0; index < fkMappings.length; index++) {
      const fkMap = fkMappings[index];
      let answer = answers[index];

      if (answer === choices[1]) {
        fkMap.leftColumn.isArray = fkMap.leftColumn.parent !== fkMap.prop.parent;
        fkMap.rightColumn.isArray = fkMap.rightColumn.parent !== fkMap.prop.parent;
      }
      else {
        fkMap.leftColumn.isArray = fkMap.rightColumn.isArray = false;
      }
    }
  }

  private async resolveManyToMany(entities: DecoratorStorage.Entity[]) {
    let possibleManyToMany = entities.filter(
      x => x.properties.length === 4 &&
        x.properties.filter(c => c.isForeignKey).length === 2 &&
        x.properties.filter(c => c.foreignKey).length === 2);

    let mtmMappings = possibleManyToMany
      .map(x => ({
        mappingTable: x,
        leftKey: x.properties.filter(x => x.foreignKey)[0],
        rightKey: x.properties.filter(x => x.foreignKey)[1],
        leftTable: entities.find(en => en.type === x.properties.filter(x => x.foreignKey)[0].type),
        rightTable: entities.find(en => en.type === x.properties.filter(x => x.foreignKey)[1].type)
      }));

    let manyToManyAnswers: any[] = mtmMappings.map(x => true);
    if (this.options.options.interactive) {
      let mtmQuestions: Questions = mtmMappings
        .map((x, i) => ({
          type: 'confirm',
          name: i.toString(),
          message: `Is '${x.mappingTable.dbName}' a many-to-many mapping table that connects '${x.leftTable.name}' and '${x.rightTable.name}'?`
        }) as Question);
      manyToManyAnswers = await this.interaction(mtmQuestions);
    }

    for (let index = 0; index < mtmMappings.length; index++) {
      let mtmMapping = mtmMappings[index];
      const answer = manyToManyAnswers[index];
      if (!answer) continue;

      mtmMapping.mappingTable.properties = mtmMapping.mappingTable.properties.filter(x => x.isColumn);

      let leftFK = mtmMapping.leftTable.properties.find(x =>
        x.foreignKey &&
        x.foreignKey.column === mtmMapping.leftKey.foreignKey.column &&
        x.foreignKey.owner.type === mtmMapping.mappingTable.type
      );
      leftFK.isArray = true;
      leftFK.manyToManyMapping = {
        leftKey: mtmMapping.leftKey.foreignKey.column,
        rightKey: mtmMapping.rightKey.foreignKey.column,
        owner: mtmMapping.mappingTable
      };
      leftFK.foreignKey = null;
      leftFK.type = mtmMapping.rightTable.type;


      let rightFK = mtmMapping.rightTable.properties.find(x =>
        x.foreignKey &&
        x.foreignKey.column === mtmMapping.rightKey.foreignKey.column &&
        x.foreignKey.owner.type === mtmMapping.mappingTable.type
      );
      rightFK.isArray = true;
      rightFK.manyToManyMapping = {
        leftKey: mtmMapping.rightKey.foreignKey.column,
        rightKey: mtmMapping.leftKey.foreignKey.column,
        owner: mtmMapping.mappingTable
      };
      rightFK.foreignKey = null;
      rightFK.type = mtmMapping.leftTable.type;
    }
  }

  private async createContextDefinitions(entities: DecoratorStorage.Entity[]) {
    let entityMap = new Map<Function, DecoratorStorage.Entity>(entities.map(x => [x.type, x]) as any);
    let context: Context = { entities: [] };

    for (let index = 0; index < entities.length; index++) {
      const entity = entities[index];

      let isMappingEntity = entities.some(x =>
        x.properties.some(prop => prop.manyToManyMapping && prop.manyToManyMapping.owner === entity));


      let propertyDefinitions: PropertyDefinition[] = entity.properties.map(prop => {
        if (prop.isColumn) {
          let propertyName = this.namingStrategy.columnNameToPropertyName(prop.name);
          return <PropertyDefinition>{
            columnName: prop.dbName,
            propertyName,
            decoratorType: 'Column'
          };
        }
        else if (prop.isNavigationProperty) {
          let targetEntity = entityMap.get(prop.type);

          if (prop.manyToManyMapping) {
            let propertyName = this.namingStrategy.manyToManyNavigationPropertyName(prop.name);
            return <PropertyDefinition>{
              columnName: prop.dbName,
              propertyName,
              decoratorType: 'ManyToMany'
            };
          }
          else if (prop.isArray) {
            let propertyName = this.namingStrategy.oneToManyNavigationPropertyName(prop.name);
            return <PropertyDefinition>{
              columnName: prop.foreignKey.column,
              propertyName,
              decoratorType: 'OneToMany'
            };
          }
          else {
            let counterProperty = targetEntity.properties
              .find(x => x.foreignKey && x.foreignKey.owner === prop.foreignKey.owner && x.foreignKey.column === prop.foreignKey.column);
            let decorator = counterProperty.isArray ? 'ManyToOne' : 'OneToOne';

            let propertyName = counterProperty.isArray ?
              this.namingStrategy.manyToOneNavigationPropertyName(prop.name) :
              this.namingStrategy.oneToOneNavigationPropertyName(prop.name);

            return <PropertyDefinition>{
              columnName: prop.foreignKey.column,
              propertyName,
              decoratorType: decorator
            };
          }
        }

        return null;
      });

      context.entities.push({
        className: isMappingEntity ?
          this.namingStrategy.mappingTableNameToEntityName(entity.dbName) :
          this.namingStrategy.tableNameToEntityName(entity.dbName),
        fileName: this.namingStrategy.tableNameToEntityFileName(entity.dbName),
        contextPropertyName: this.namingStrategy.tableNameToContextPropertyName(entity.dbName),
        tableName: entity.dbName,
        propertyDefinitions,
        isMappingEntity,
        entity
      });
    }

    let contextFileName = this.namingStrategy.databaseNameToContextFileName(this.config.database);
    let contextClassName = this.namingStrategy.databaseNameToContextName(this.config.database);

    context.entitypeContext = {
      className: contextClassName,
      fileName: contextFileName,
      databaseName: this.config.database
    };

    return context;
  }

  private async createEntityFiles(options: PullOptions, context: Context) {
    let entityMap = new Map<Function, EntityDefinition>(context.entities.map(x => [x.entity.type, x]) as any);

    let directory = path.resolve(options.output);
    fs.mkdirpSync(directory);

    for (let index = 0; index < context.entities.length; index++) {
      const entityDef = context.entities[index];
      const entity = context.entities[index].entity;

      let entitypeImports = new Set<string>(['Entity']);
      let ctxImports = new Set<EntityDefinition>();

      let propertyLines = [];

      for (let propIndex = 0; propIndex < entity.properties.length; propIndex++) {
        const prop = entity.properties[propIndex];
        propertyLines.push('');

        if (prop.isColumn) {
          let propName = this.namingStrategy.columnNameToPropertyName(prop.name);

          entitypeImports.add('Column');

          let options = [
            `columnName: \`${prop.dbName}\``,
            `type: \`${prop.options.type}\``
          ];

          if (prop.options.nullable !== DefaultColumnOptions.nullable)
            options.push(`nullable: ${prop.options.nullable}`);

          if (prop.options.unique !== DefaultColumnOptions.unique)
            options.push(`unique: ${prop.options.nullable}`);

          if (prop.options.generated !== DefaultColumnOptions.generated)
            options.push(`generated: ${prop.options.generated}`);

          if (prop.options.primaryKey !== DefaultColumnOptions.primaryKey)
            options.push(`primaryKey: ${prop.options.primaryKey}`);

          if (prop.options.default !== DefaultColumnOptions.default)
            options.push(`default: ${prop.options.default}`);

          if (prop.options.index !== DefaultColumnOptions.index)
            options.push(`index: ${prop.options.index}`);

          let optionsString = `{ ${options.join(', ')} }`;
          let nullableSign = prop.options.nullable ? '?' : '';

          propertyLines.push(`@Column(${optionsString})`);
          propertyLines.push(`${propName}${nullableSign}: ${getTypeName(prop.type)};`);
        }
        else if (prop.isNavigationProperty) {
          let targetEntity = entityMap.get(prop.type);
          ctxImports.add(targetEntity);

          if (prop.manyToManyMapping) {
            let propName = this.namingStrategy.manyToManyNavigationPropertyName(prop.name);

            let mappingEntity = entityMap.get(prop.manyToManyMapping.owner.type);
            ctxImports.add(mappingEntity);

            let leftKeyDef = mappingEntity.propertyDefinitions.find(x => x.columnName === prop.manyToManyMapping.leftKey);
            let rightKeyDef = mappingEntity.propertyDefinitions.find(x => x.columnName === prop.manyToManyMapping.rightKey);


            entitypeImports.add('ManyToMany');
            propertyLines.push(
              `@ManyToMany(type => ${targetEntity.className}, joinType => ${mappingEntity.className}, ` +
              `x => x.${leftKeyDef.propertyName}, x => x.${rightKeyDef.propertyName})`
            );
            propertyLines.push(`${propName}: ${targetEntity.className}[];`);
          }
          else if (prop.isArray) {
            let propName = this.namingStrategy.oneToManyNavigationPropertyName(prop.name);

            entitypeImports.add('OneToMany');

            let fkOwner = entityMap.get(prop.foreignKey.owner.type);
            let fkDef = fkOwner.propertyDefinitions.find(x => x.columnName === prop.foreignKey.column);

            propertyLines.push(`@OneToMany(type => ${fkOwner.className}, x => x.${fkDef.propertyName})`);
            propertyLines.push(`${propName}: ${targetEntity.className}[];`);
          }
          else {
            let counterProperty = targetEntity.entity.properties
              .find(x => x.foreignKey && x.foreignKey.owner === prop.foreignKey.owner && x.foreignKey.column === prop.foreignKey.column);
            let decorator = counterProperty.isArray ? 'ManyToOne' : 'OneToOne';

            let fkOwner = entityMap.get(prop.foreignKey.owner.type);
            let fkDef = fkOwner.propertyDefinitions.find(x => x.columnName === prop.foreignKey.column);

            let propName = counterProperty.isArray ?
              this.namingStrategy.manyToOneNavigationPropertyName(prop.name) :
              this.namingStrategy.oneToOneNavigationPropertyName(prop.name);

            entitypeImports.add(decorator);

            propertyLines.push(`@${decorator}(type => ${fkOwner.className}, x => x.${fkDef.propertyName})`);
            propertyLines.push(`${propName}: ${targetEntity.className};`);
          }
        }
      }


      let lines = [];

      let entitypeImportSeq = Array.from(entitypeImports).sort().join(', ');
      let entitypeImport = `import { ${entitypeImportSeq} } from 'entitype';`;
      lines.push(entitypeImport, '');

      let ctxImportSeq = Array.from(ctxImports).sort(compareByFileName)
        .map(x => `import { ${x.className} } from './${x.fileName}';`);
      lines.push(...ctxImportSeq, '');

      lines.push(`@Entity('${entityDef.tableName}')`);
      lines.push(`export class ${entityDef.className} {`);

      lines.push(...propertyLines.map(x => '  ' + x));

      lines.push('}');
      lines.push('');


      let fileContent = lines.join(os.EOL);

      let filePath = path.join(directory, entityDef.fileName + '.ts');
      fs.writeFileSync(filePath, fileContent, 'utf8');
    }
  }

  private async createContextFile(options: PullOptions, context: Context) {
    let directory = path.resolve(options.output);
    fs.mkdirpSync(directory);
    let entitypeImports = new Set<string>(['EntitypeContext', 'IQueryable', 'DbCollection']);
    let ctxImports = new Set<EntityDefinition>();
    let propertyLines = [];


    context.entities.filter(x => !x.isMappingEntity).forEach(entity => {
      ctxImports.add(entity);
      propertyLines.push('');
      propertyLines.push(`@DbCollection(${entity.className})`);
      propertyLines.push(`${entity.contextPropertyName}: IQueryable<${entity.className}>;`);
    });



    let lines = [];

    let entitypeImportSeq = Array.from(entitypeImports).sort().join(', ');
    let entitypeImport = `import { ${entitypeImportSeq} } from 'entitype';`;
    lines.push(entitypeImport, '');

    let ctxImportSeq = Array.from(ctxImports).sort(compareByFileName)
      .map(x => `import { ${x.className} } from './${x.fileName}';`);
    lines.push(...ctxImportSeq, '');

    lines.push(`export class ${context.entitypeContext.className} extends EntitypeContext {`);

    lines.push(...propertyLines.map(x => '  ' + x));

    lines.push('}');
    lines.push('');


    let fileContent = lines.join(os.EOL);

    let filePath = path.join(directory, context.entitypeContext.fileName + '.ts');
    fs.writeFileSync(filePath, fileContent, 'utf8');
  }

  private async createIndexFile(options: PullOptions, context: Context) {
    let directory = path.resolve(options.output);
    fs.mkdirpSync(directory);

    let fileNames = context.entities.filter(x => !x.isMappingEntity).map(x => ({ fileName: x.fileName }));
    fileNames.push({ fileName: context.entitypeContext.fileName });

    let lines = [];

    let ctxImportSeq = fileNames.sort(compareByFileName)
      .map(x => `export * from './${x.fileName}';`);
    lines.push(...ctxImportSeq, '');

    let fileContent = lines.join(os.EOL);

    let filePath = path.join(directory, 'index.ts');
    fs.writeFileSync(filePath, fileContent, 'utf8');
  }
}

