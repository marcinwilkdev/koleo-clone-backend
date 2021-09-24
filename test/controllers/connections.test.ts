import { createResponse } from "../createResponse";

import ConnectionService from "../../src/services/database/ConnectionService";
import { ISavedConnection } from "../../src/models/connection";

import { addConnection } from "../../src/controllers/connections";
import { Request } from "express";
import { expect } from "chai";

const savedConnection: ISavedConnection = {
    cities: [],
    trainType: "",
    id: "",
};

const req = {
    body: {
        cities: [],
        trainType: ""
    }
} as unknown as Request;

describe("connections controller - add connection", () => {
    const res = createResponse();

    before(() => {
        ConnectionService.init({
            findById: async () => null,
            getConnectionsByCities: async () => [],
            save: async () => savedConnection,
        });
    });

    it("should send correct response if user has been created", (done) => {
        addConnection(req, res, () => {}).then(() => {
            expect(res).to.have.property("statusCode", 201);
            expect(res.body).to.have.property(
                "message",
                "Connection added succesfully."
            );

            done();
        });
    });
});

describe("connections controller - find connections", () => {});
