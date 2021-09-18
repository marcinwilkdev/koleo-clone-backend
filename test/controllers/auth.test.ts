import { expect } from "chai";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { signin, signup } from "../../src/controllers/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../src/models/user";
import HttpException from "../../src/util/HttpException";
import { stub } from "sinon";

describe("auth controller - signin", () => {
    const res = {
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

    let exception: null | HttpException;

    const next = ((exc: HttpException) => {
        exception = exc;
    }) as unknown as NextFunction;

    before((done) => {
        mongoose
            .connect(
                "mongodb+srv://root:D7alUq7tPN5yVyxK@cluster0.hew9q.mongodb.net/koleo-dev-test?retryWrites=true&w=majority"
            )
            .then(() => {
                const user = new User({
                    email: "test@test.com",
                    password: "test",
                });

                return user.save();
            })
            .then(() => done());
    });

    beforeEach(() => {
        exception = null;
    });

    it("should throw 'User not found.' if user hasn't been found", (done) => {
        const req = {
            body: {
                email: "test2@test.com",
                password: "test",
            },
        } as unknown as Request;

        signin(req, res as unknown as Response, next).then(() => {
            expect(exception).to.have.property("message", "User not found.");

            done();
        });
    });

    it("should throw 'Wrong password.' if password is wrong", (done) => {
        const req = {
            body: {
                email: "test@test.com",
                password: "test2",
            },
        } as unknown as Request;

        stub(bcryptjs, "compare");

        (bcryptjs.compare as any).resolves(false);

        signin(req, res as unknown as Response, next).then(() => {
            expect(exception).to.have.property("message", "Wrong password.");

            (bcryptjs.compare as any).restore();

            done();
        });
    });

    it("should set response token if authentication completed succesfully", (done) => {
        const req = {
            body: {
                email: "test@test.com",
                password: "test",
            },
        } as unknown as Request;

        stub(bcryptjs, "compare");
        stub(jwt, "sign");

        (bcryptjs.compare as any).resolves(true);
        (jwt.sign as any).returns("xyz");

        signin(req, res as unknown as Response, next).then(() => {
            expect(res).to.have.property("statusCode", 200);
            expect(res.body).to.have.property(
                "message",
                "Logged in succesfully."
            );
            expect(res.body).to.have.property("token", "xyz");

            (bcryptjs.compare as any).restore();
            (jwt.sign as any).restore();

            done();
        });
    });

    after((done) => {
        User.deleteMany({})
            .then(() => mongoose.disconnect())
            .then(() => done());
    });
});

describe("auth controller - signup", () => {
    const res = {
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

    before((done) => {
        mongoose
            .connect(
                "mongodb+srv://root:D7alUq7tPN5yVyxK@cluster0.hew9q.mongodb.net/koleo-dev-test?retryWrites=true&w=majority"
            )
            .then(() => done());
    });

    it("should send correct response if user has been created", (done) => {
        const req = {
            body: {
                email: "test@test.com",
                password: "test",
            },
        } as unknown as Request;

        stub(bcryptjs, "hash");

        (bcryptjs.hash as any).resolves("test");

        signup(req, res as unknown as Response, () => {}).then(() => {
            expect(res).to.have.property("statusCode", 201);
            expect(res.body).to.have.property(
                "message",
                "User created succesfully."
            );

            (bcryptjs.hash as any).restore();

            done();
        });
    });

    after((done) => {
        User.deleteMany({})
            .then(() => mongoose.disconnect())
            .then(() => done());
    });
});
