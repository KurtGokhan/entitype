import { ObjectType } from '../fluent';


export type EntityTrack = Map<any, Map<any, any> | any>;

export class Tracker {
  entities: Map<ObjectType<any>, EntityTrack> = new Map();

  getTrackedValue<T>(type: ObjectType<T>, primaryKeyValues: any[]): T {
    let entityTrack = this.entities.get(type);

    if (!entityTrack) {
      entityTrack = new Map();
      this.entities.set(type, entityTrack);
    }

    let currentTrack = entityTrack;
    for (let index = 0; index < primaryKeyValues.length - 1; index++) {
      let pkValue = primaryKeyValues[index];
      let track = currentTrack.get(pkValue);
      if (!track) {
        track = new Map();
        currentTrack.set(pkValue, track);
      }
      currentTrack = track;
    }

    let lastPkValue = primaryKeyValues[primaryKeyValues.length - 1];
    return currentTrack.get(lastPkValue);
  }

  setTrackedValue<T>(type: ObjectType<T>, primaryKeyValues: any[], value: T): void {
    let entityTrack = this.entities.get(type);

    if (!entityTrack) {
      entityTrack = new Map();
      this.entities.set(type, entityTrack);
    }

    let currentTrack = entityTrack;
    for (let index = 0; index < primaryKeyValues.length - 1; index++) {
      let pkValue = primaryKeyValues[index];
      let track = currentTrack.get(pkValue);
      if (!track) {
        track = new Map();
        currentTrack.set(pkValue, track);
      }
      currentTrack = track;
    }

    let lastPkValue = primaryKeyValues[primaryKeyValues.length - 1];
    currentTrack.set(lastPkValue, value);
  }
}
