export class UnknownPropertyError extends Error {
  constructor(propertyName?: string) {
    super(`Cannot navigate to '${propertyName}' since it is not a known column.`);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
