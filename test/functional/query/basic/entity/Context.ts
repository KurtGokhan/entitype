import { Model } from './Model';
import { DbSet } from '../../../../../src/collections/DbSet';

import { EntitypeContext } from "../../../../../src/context/EntitypeContext";

export class Context extends EntitypeContext {
    constructor() {
        super();
    }

    Models: DbSet<Model>;
}