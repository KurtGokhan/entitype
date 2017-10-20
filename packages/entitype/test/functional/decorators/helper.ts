import { expect } from 'chai';
import { DecoratorStorage } from 'src/storage/DecoratorStorage';

import { Model } from './entity/Model';
import { ChildModel } from './entity/ChildModel';
import { OtherModel } from './entity/OtherModel';

export function assertForeignKeys() {
  let model = DecoratorStorage.getEntity(Model);
  let childmodel = DecoratorStorage.getEntity(ChildModel);
  let othermodel = DecoratorStorage.getEntity(OtherModel);

  let modelChild = model.columns.find(x => x.name === 'child');
  let modelOther = model.columns.find(x => x.name === 'other');

  expect(modelChild.foreignKey.owner.type).to.be.equal(Model);
  expect(modelChild.foreignKey.column).to.be.equal('child_id');

  expect(modelOther.foreignKey.owner.type).to.be.equal(OtherModel);
  expect(modelOther.foreignKey.column).to.be.equal('parent_id');

  let childmodelParent = childmodel.columns.find(x => x.name === 'parent');

  expect(childmodelParent.foreignKey.owner.type).to.be.equal(Model);
  expect(childmodelParent.foreignKey.column).to.be.equal('child_id');

  let othermodelParent = othermodel.columns.find(x => x.name === 'parent');

  expect(othermodelParent.foreignKey.owner.type).to.be.equal(OtherModel);
  expect(othermodelParent.foreignKey.column).to.be.equal('parent_id');
}

export function assertColumns() {
  let model = DecoratorStorage.getEntity(Model);
  let childmodel = DecoratorStorage.getEntity(ChildModel);
  let othermodel = DecoratorStorage.getEntity(OtherModel);

  let modelId = model.columns.find(x => x.name === 'id');
  let modelName = model.columns.find(x => x.name === 'name');
  let modelChild = model.columns.find(x => x.name === 'child');
  let modelChildId = model.columns.find(x => x.name === 'child_id');
  let modelOther = model.columns.find(x => x.name === 'other');

  expect(modelId.isColumn && !modelId.isNavigationProperty);
  expect(modelName.isColumn && !modelName.isNavigationProperty);
  expect(modelChildId.isColumn && !modelChildId.isNavigationProperty);

  expect(!modelChild.isColumn && modelChild.isNavigationProperty);
  expect(!modelOther.isColumn && modelOther.isNavigationProperty);


  let childmodelId = childmodel.columns.find(x => x.name === 'id');
  let childmodelName = childmodel.columns.find(x => x.name === 'name');
  let childmodelParent = childmodel.columns.find(x => x.name === 'parent');

  expect(childmodelId.isColumn && !childmodelId.isNavigationProperty);
  expect(childmodelName.isColumn && !childmodelName.isNavigationProperty);
  expect(!childmodelParent.isColumn && childmodelParent.isNavigationProperty);

  let othermodelId = othermodel.columns.find(x => x.name === 'id');
  let othermodelName = othermodel.columns.find(x => x.name === 'name');
  let othermodelParentId = othermodel.columns.find(x => x.name === 'parent_id');
  let othermodelParent = othermodel.columns.find(x => x.name === 'parent');

  expect(othermodelId.isColumn && !othermodelId.isNavigationProperty);
  expect(othermodelName.isColumn && !othermodelName.isNavigationProperty);
  expect(othermodelParentId.isColumn && !othermodelParentId.isNavigationProperty);

  expect(!othermodelParent.isColumn && othermodelParent.isNavigationProperty);
}

export function assertEntities() {
  let model = DecoratorStorage.getEntity(Model);
  let childmodel = DecoratorStorage.getEntity(ChildModel);
  let othermodel = DecoratorStorage.getEntity(OtherModel);

  expect(model);
  expect(model.type).to.be.equal(Model);

  expect(childmodel);
  expect(childmodel.type).to.be.equal(ChildModel);

  expect(othermodel);
  expect(othermodel.type).to.be.equal(OtherModel);
}
