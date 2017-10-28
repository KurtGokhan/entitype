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
