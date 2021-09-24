import { NextFunction, Request } from "express";
import { expect } from "chai";

import { isAdmin } from "../../src/middlewares/is-admin";

import { createResponse } from "../createResponse";
import HttpException from "../../src/util/HttpException";
import UserService from "../../src/services/database/UserService";
import { ISavedUser } from "../../src/models/user";
import { initServices } from "../initServices";

const savedUser: ISavedUser = {
    id: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
    discount: "",
    firstName: "",
    lastName: "",
};

const req = {
    userId: ""
} as unknown as Request;

describe("isAdmin middleware", () => {
    const res = createResponse();

    let exception: null | HttpException;
    let nextCalled = false;

    const next = ((exc: HttpException) => {
        exception = exc;
        nextCalled = true;
    }) as unknown as NextFunction;

    before(() => initServices());

    it("should throw 'User not found.' if user was not found", (done) => {
        isAdmin(req, res, next).then(() => {
            expect(exception).to.have.property(
                "message", "User not found."
            );

            done();
        })
    });

    it("should throw 'User is not an admin.' if user is not an admin", (done) => {
        UserService.getInstance().findById = async () => savedUser;

        isAdmin(req, res, next).then(() => {
            expect(exception).to.have.property(
                "message", "User is not an admin."
            );

            done();
        })
    });

    it("should call next without exception if user is an admin", (done) => {
        savedUser.isAdmin = true;

        nextCalled = false;

        isAdmin(req, res, next).then(() => {
            console.log(nextCalled, exception);

            expect(exception).to.be.equal(undefined);
            expect(nextCalled).to.be.equal(true);

            done();
        })
    });
});
