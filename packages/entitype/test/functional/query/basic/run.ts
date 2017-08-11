import { IQueryable } from '../../../../src/fluent/interfaces/types';
import { Context } from './entity/Context';
import { Model } from './entity/Model';
import 'reflect-metadata';
import { expect } from "chai";

describe("query > basic", () => {

    // let connections: Connection[];
    // before(async () => connections = await createTestingConnections({
    //     entities: [__dirname + "/entity/*{.js,.ts}"],
    //     schemaCreate: true,
    //     dropSchema: true,
    // }));
    // beforeEach(() => reloadTestingDatabases(connections));
    // after(() => closeTestingConnections(connections));

    it("should perform selection correctly", async () => {
        let ctx = new Context();
        let loadModelQuery = await ctx.Models.first.query;
        expect(loadModelQuery).to.be.equal('SELECT TOP 1 * FROM models');
    });

});