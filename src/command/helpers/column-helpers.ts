
import { DecoratorStorage } from 'src/context/DecoratorStorage';

export function getEntity(entityTypeOrObject: Function | string | DecoratorStorage.Entity): DecoratorStorage.Entity {
  if (typeof entityTypeOrObject === 'object') {
    if (entityTypeOrObject instanceof DecoratorStorage.Entity) {
      return entityTypeOrObject;
    }
  }

  return DecoratorStorage.getEntity(entityTypeOrObject);
}

export function getColumns(entityTypeOrObject: Function | DecoratorStorage.Entity): DecoratorStorage.Column[] {
  let entity = getEntity(entityTypeOrObject);
  return entity.columns;
}
