import { createResponse } from "../createResponse";

import ConnectionService from "../../src/services/database/ConnectionService";
import { ISavedConnection } from "../../src/models/connection";

import {
    addConnection,
    findConnections,
} from "../../src/controllers/connections";
import { NextFunction, Request } from "express";
import { expect } from "chai";
import HttpException from "../../src/util/HttpException";
import UserService from "../../src/services/database/UserService";
import { ISavedUser } from "../../src/models/user";
import { initServices } from "../initServices";

const req = {
    body: {
        cities: [],
        trainType: "",
    },
    query: {}
} as unknown as Request;

describe("connections controller - add connection", () => {
    const res = createResponse();

    before(() => initServices());

    it("should send correct response if connection has been created", (done) => {
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

describe("connections controller - find connections", () => {
    const res = createResponse();

    let exception: null | HttpException;

    const next = ((exc: HttpException) => {
        exception = exc;
    }) as unknown as NextFunction;

    before(() => initServices());

    it("should throw 'Couldn't find connections.' if query parameters not present", (done) => {
        findConnections(req, res, next).then(() => {
            expect(exception).to.have.property(
                "message",
                "Couldn't find connections."
            );

            done();
        });
    });

    it("should send correct response if connections have been fetched", (done) => {
        req.query.from = "xyz";
        req.query.to = "xyz";
        
        findConnections(req, res, next).then(() => {
            expect(res).to.have.property("statusCode", 200);
            expect(res.body).to.have.property(
                "message",
                "Connections fetched succesfully."
            );

            done();
        });
    })
});
