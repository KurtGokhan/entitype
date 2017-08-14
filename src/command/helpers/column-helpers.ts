
import { DecoratorStorage } from 'src/context/DecoratorStorage';

export function getEntity(entityTypeOrObject: Function | string) {
  return DecoratorStorage.getEntity(entityTypeOrObject);
}

export function getColumns(entityTypeOrObject: Function | Object): DecoratorStorage.Column[] {
  if (typeof entityTypeOrObject === 'function') {
    let entity = DecoratorStorage.getEntity(entityTypeOrObject);
    return entity.columns;
  }
  return null;
}
