import { NextFunction, Request } from "express";

import { expect } from "chai";

import { getUserDiscount, handleErrors } from "../../src/util/helpers";
import HttpException from "../../src/util/HttpException";
import UserService from "../../src/services/database/UserService";
import { ISavedUser } from "../../src/models/user";

const savedUser: ISavedUser = {
    id: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
    discount: "true",
    firstName: "",
    lastName: "",
};

const req = {
    userId: "xyz"
} as unknown as Request;

describe("handle errors", () => {
    let exception: HttpException | null;

    const next = (exc: HttpException) => {
        exception = exc;
    };

    beforeEach(() => {
        exception = null;
    })

    it("should send 'Something went wrong.' 500 http exception if no err passed", () => {
        const err = {};

        handleErrors(err, next as unknown as NextFunction);

        expect(exception).to.have.property("message", "Something went wrong.");
        expect(exception).to.have.property("statusCode", 500);
    });

    it("should send custom http exception if err passed", () => {
        const err = {
            message: "Test message",
            statusCode: 400,
        };

        handleErrors(err, next as unknown as NextFunction);

        expect(exception).to.have.property("message", "Test message");
        expect(exception).to.have.property("statusCode", 400);
    });
});

describe("get userDiscount", () => {
    before(() => {
        UserService.init({
            findByEmail: async () => null,
            findById: async () => null,
            save: async () => savedUser,
            update: async () => savedUser
        })
    })

    it("should return 0 if user doesn't have discount or user not present", (done) => {
        getUserDiscount(req).then((discount) => {
            expect(discount).to.be.equal(0);

            done();
        })
    })

    it("should return 0.5 if user has discount", (done) => {
        UserService.getInstance().findById = async () => savedUser;

        getUserDiscount(req).then((discount) => {
            expect(discount).to.be.equal(0.5);

            done();
        })
    })
})
