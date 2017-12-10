import { DecoratorStorage } from './DecoratorStorage';

export function setObjectPath(objectRoot: any, path: string[], value: any, createMissing: boolean = true) {
  if (!path.length) return value;

  let root = { root: objectRoot };
  let parentNode = root;
  let parentPath = 'root';
  let currentNode = objectRoot;
  let count = path.length;

  for (let index = 0; index < count; index++) {
    let pathPart = path[index];

    if (currentNode == null) {
      if (!createMissing) throw new Error(`Object instance was missing in path '${pathPart}'.`);
      else parentNode[parentPath] = currentNode = {};
    }

    parentNode = currentNode;
    parentPath = pathPart;
    currentNode = currentNode[pathPart];
  }

  let lastPart = path[count - 1];
  parentNode[lastPart] = value;

  return root.root;
}

export function getObjectPath(objectRoot: any, path: string[], ignoreMissing: boolean = true) {
  if (!path.length) return objectRoot;

  let currentNode = objectRoot;
  let count = path.length;

  for (let index = 0; index < count; index++) {
    let pathPart = path[index];

    if (currentNode == null) {
      if (!ignoreMissing) throw new Error(`Object instance was missing in path '${pathPart}'.`);
      else return null;
    }

    currentNode = currentNode[pathPart];
  }

  return currentNode;
}

declare var Buffer;
declare var UInt8Array;

export function isColumnBuffer(column: DecoratorStorage.Property): boolean {
  if (typeof Buffer === 'function' && column.type === Buffer) return true;
  if (typeof UInt8Array === 'function' && column.type === UInt8Array) return true;
  if (column.options && column.options.type && column.options.type.includes('blob')) return true;
  return false;
}

export function isBufferConversionRequired(column: DecoratorStorage.Property, data): boolean {
  return isColumnBuffer(column) && typeof data === 'string';
}

export function createBufferFromHex(column: DecoratorStorage.Property, hex: string): any {
  let byteArray: any[] = new Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    byteArray[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }

  if (typeof Buffer === 'function' && column.type === Buffer) {
    return Buffer.from(byteArray);
  }
  if (typeof UInt8Array === 'function' && column.type === UInt8Array) {
    let uintArray = new UInt8Array(byteArray.length);
    for (let i = 0; i < uintArray.length; i++) {
      uintArray[i] = byteArray[i];
    }
    return uintArray;
  }
  return byteArray;
}
