import { NextFunction, Request, Response } from "express";
import { expect } from "chai";

import { setData, signin, signup } from "../../src/controllers/auth";

import UserService from "../../src/services/database/UserService";
import EncryptionService from "../../src/services/other/EncryptionService";
import WebTokenService from "../../src/services/other/WebTokenService";

import HttpException from "../../src/util/HttpException";

import { ISavedUser } from "../../src/models/user";

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
    body: {
        email: "",
        password: "",
        discount: "",
        firstName: "",
        lastName: "",
        dateOfBirth: new Date(),
    },
    userId: ""
} as unknown as Request;

describe("auth controller - signin", () => {
    const response = {
        statusCode: 500,
        body: {} as any,
        status: function (code: number) {
            this.statusCode = code;
            return this;
        },
        json: function (payload: any) {
            this.body = payload;
            return this;
        },
    };

    const res = response as unknown as Response & { body: any };

    let exception: null | HttpException;

    const next = ((exc: HttpException) => {
        exception = exc;
    }) as unknown as NextFunction;

    before(() => {
        UserService.init({
            save: async () => savedUser,
            findByEmail: async () => null,
            findById: async () => null,
        });

        EncryptionService.init({
            compare: async () => false,
            hash: async () => "",
        });

        WebTokenService.init({
            secret: "",
            sign: () => "xyz",
            verify: () => {},
        });
    });

    beforeEach(() => {
        exception = null;
    });

    it("should throw 'User not found.' if user hasn't been found", (done) => {
        signin(req, res, next).then(() => {
            expect(exception).to.have.property("message", "User not found.");

            done();
        });
    });

    it("should throw 'Wrong password.' if password is wrong", (done) => {
        UserService.getInstance().findByEmail = async () => savedUser;

        signin(req, res, next).then(() => {
            expect(exception).to.have.property("message", "Wrong password.");

            done();
        });
    });

    it("should set authentication token if authentication completed succesfully", (done) => {
        EncryptionService.getInstance().compare = async () => true;

        signin(req, res, next).then(() => {
            expect(res).to.have.property("statusCode", 200);
            expect(res.body).to.have.property(
                "message",
                "Logged in succesfully."
            );
            expect(res.body).to.have.property("token", "xyz");

            done();
        });
    });
});

describe("auth controller - signup", () => {
    const response = {
        statusCode: 500,
        body: {} as any,
        status: function (code: number) {
            this.statusCode = code;
            return this;
        },
        json: function (payload: any) {
            this.body = payload;
            return this;
        },
    };

    const res = response as unknown as Response & { body: any };

    before(() => {
        UserService.init({
            save: async () => savedUser,
            findByEmail: async () => null,
            findById: async () => null,
        });

        EncryptionService.init({
            compare: async () => false,
            hash: async () => "xyz",
        });

        WebTokenService.init({
            secret: "",
            sign: () => "xyz",
            verify: () => {},
        });
    });

    it("should send correct response if user has been created", (done) => {
        signup(req, res, () => {}).then(() => {
            expect(res).to.have.property("statusCode", 201);
            expect(res.body).to.have.property(
                "message",
                "User created succesfully."
            );

            done();
        });
    });
});

describe("auth controller - setData", () => {
    const response = {
        statusCode: 500,
        body: {} as any,
        status: function (code: number) {
            this.statusCode = code;
            return this;
        },
        json: function (payload: any) {
            this.body = payload;
            return this;
        },
    };

    const res = response as unknown as Response & { body: any };

    let exception: null | HttpException;

    const next = ((exc: HttpException) => {
        exception = exc;
    }) as unknown as NextFunction;

    before(() => {
        UserService.init({
            save: async () => savedUser,
            findByEmail: async () => null,
            findById: async () => null,
        });
    });

    it("should throw 'User not found.' if user hasn't been found", (done) => {
        setData(req, res, next).then(() => {
            expect(exception).to.have.property("message", "User not found.");

            done();
        });
    });

    it("should send correct response if user data has been set", (done) => {
        UserService.getInstance().findById = async () => savedUser;

        setData(req, res, () => {}).then(() => {
            expect(res).to.have.property("statusCode", 200);
            expect(res.body).to.have.property(
                "message",
                "User data set succesfully."
            );

            done();
        });
    });
});
