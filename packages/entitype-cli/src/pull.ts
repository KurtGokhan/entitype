import { DecoratorStorage } from 'entitype/dist/common/DecoratorStorage';
import { DefaultColumnOptions } from 'entitype/dist/decorators';
import * as fs from 'fs-extra';
import { Question, Questions } from 'inquirer';
import * as os from 'os';
import * as path from 'path';

import { vorpal } from './cli';
import { getConfiguration, getDriverAdapter } from './configuration';

export type PullOptions = {
  interactive?: boolean;
  config?: string;
  output?: string;
};

export async function pull(options: PullOptions) {
  let config = await getConfiguration(options.config);

  let adapterName = config.adapter;
  let adapter = await getDriverAdapter(adapterName);

  let entities = await adapter.getEntities(config);
  await resolveEntityRelationships(entities);

  await createEntityFiles(options, entities);
  await createContextFile(options, entities);
}

async function resolveEntityRelationships(entities: DecoratorStorage.Entity[]) {
  await resolveManyToMany(entities);
  await resolveOneToManyOrOneToOne(entities);
}

async function resolveOneToManyOrOneToOne(entities: DecoratorStorage.Entity[]) {
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

  let questions: Questions = fkMappings.map((x, i) => ({
    type: 'list',
    name: i.toString(),
    message: `What is the relationship between the table '${x.leftColumn.parent.dbName}' and '${x.rightColumn.parent.dbName}'?`,
    choices
  }));

  let answers = await vorpal.activeCommand.prompt(questions);

  for (let index = 0; index < fkMappings.length; index++) {
    const fkMap = fkMappings[index];
    let answer = answers[index];

    if (answer) {
      fkMap.leftColumn.isArray = fkMap.leftColumn.parent === fkMap.prop.parent;
      fkMap.rightColumn.isArray = fkMap.rightColumn.parent === fkMap.prop.parent;
    }
    else {
      fkMap.leftColumn.isArray = fkMap.rightColumn.isArray = false;
    }
  }
}

async function resolveManyToMany(entities: DecoratorStorage.Entity[]) {
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

  let mtmQuestions: Questions = mtmMappings
    .map((x, i) => ({
      type: 'confirm',
      name: i.toString(),
      message: `Is '${x.mappingTable.dbName}' a many-to-many mapping table that connects '${x.leftTable.name}' and '${x.rightTable.name}'?`
    }) as Question);

  let manyToManyAnswers = await vorpal.activeCommand.prompt(mtmQuestions);

  let manyToMany = [];
  for (let index = 0; index < mtmQuestions.length; index++) {
    const answer = manyToManyAnswers[index];
    if (!answer) continue;

    let mtmMapping = mtmMappings[index];
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


    let rightFK = mtmMapping.rightTable.properties.find(x =>
      x.foreignKey &&
      x.foreignKey.column === mtmMapping.rightKey.foreignKey.column &&
      x.foreignKey.owner.type === mtmMapping.mappingTable.type
    );
    rightFK.isArray = true;
    rightFK.manyToManyMapping = {
      leftKey: mtmMapping.rightKey.dbName,
      rightKey: mtmMapping.leftKey.dbName,
      owner: mtmMapping.mappingTable
    };
    rightFK.foreignKey = null;
  }
}

async function createEntityFiles(options: PullOptions, entities: DecoratorStorage.Entity[]) {
  type EntitySpec = {
    entity: DecoratorStorage.Entity;
    fileName: string;
    className: string;
  };

  let entityMap = new Map<Function, DecoratorStorage.Entity>(entities.map(x => [x.type, x]) as any);

  let directory = path.resolve(options.output);
  fs.mkdirpSync(directory);

  for (let index = 0; index < entities.length; index++) {
    const entity = entities[index];

    let entitypeImports = new Set<string>(['Entity']);
    let ctxImports = new Set<string>();

    let propertyLines = [];

    for (let propIndex = 0; propIndex < entity.properties.length; propIndex++) {
      const prop = entity.properties[propIndex];
      propertyLines.push('');

      if (prop.isColumn) {
        entitypeImports.add('Column');

        // TODO: fix options and type
        propertyLines.push(`@Column('${prop.dbName}')`);
        propertyLines.push(`${prop.name}: ${prop.type};`);
      }
      else if (prop.isNavigationProperty) {
        let targetEntity = entityMap.get(prop.type);
        ctxImports.add(targetEntity.name);

        if (prop.manyToManyMapping) {
          let mappingEntity = prop.manyToManyMapping.owner;
          ctxImports.add(mappingEntity.name);

          entitypeImports.add('ManyToMany');
          propertyLines.push(`@ManyToMany(type => ${mappingEntity.dbName}, x => x.${prop.manyToManyMapping.leftKey}, x => x.${prop.manyToManyMapping.rightKey})`);
          propertyLines.push(`${prop.name}: ${targetEntity.name}[];`);
        }
        else if (prop.isArray) {
          entitypeImports.add('OneToMany');

          let fkOwner = entityMap.get(prop.foreignKey.owner.type);
          propertyLines.push(`@OneToMany(type => ${fkOwner.name}, x => x.${prop.foreignKey.column})`);
          propertyLines.push(`${prop.name}: ${targetEntity.name}[];`);
        }
        else {
          entitypeImports.add('OneToOne');

          let fkOwner = entityMap.get(prop.foreignKey.owner.type);
          propertyLines.push(`@OneToOne(type => ${fkOwner.name}, x => x.${prop.foreignKey.column})`);
          propertyLines.push(`${prop.name}: ${targetEntity.name};`);
        }
      }
    }


    let lines = [];

    let entitypeImportSeq = Array.from(entitypeImports).sort().join(', ');
    let entitypeImport = `import { ${entitypeImportSeq} } from 'entitype';`;
    lines.push(entitypeImport, '');

    let ctxImportSeq = Array.from(ctxImports).sort().map(x => `import { ${x} } from './${x}';`);
    lines.push(...ctxImportSeq, '');

    lines.push(`@Entity('${entity.dbName}')`);
    lines.push(`export class ${entity.dbName} {`);

    lines.push(...propertyLines.map(x => '  ' + x));

    lines.push('}');
    lines.push('');


    let fileContent = lines.join(os.EOL);

    let filePath = path.join(directory, entity.name + '.ts');
    fs.writeFileSync(filePath, fileContent, 'utf8');
  }
}

async function createContextFile(options: PullOptions, entities: DecoratorStorage.Entity[]) {
}
