import { expect } from "chai";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { signin } from "../../src/controllers/auth";
import bcryptjs from "bcryptjs";

import User from "../../src/models/user";
import HttpException from "../../src/util/HttpException";

describe("auth controller - signin", () => {
    const res = {
        statusCode: 500,
        body: {} as any,
        status: function(code: number) {
            this.statusCode = code;
            return this;
        },
        json: function(payload: any) {
            this.body = payload;
            return this;
        }
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
                return bcryptjs.hash("test", 12);
            })
            .then((hashedPassword) => {
                const user = new User({
                    email: "test@test.com",
                    password: hashedPassword,
                });

                return user.save();
            })
            .then(() => done());
    });

    beforeEach(() => {
        exception = null;
    })

    it("should throw 'User not found.' 400 if user hasn't been found", (done) => {
        const req = {
            body: {
                email: "test2@test.com",
                password: "test",
            },
        } as unknown as Request;

        signin(req, res as unknown as Response, next).then((value) => {
            expect(exception).to.have.property("message", "User not found.");
            done();
        });
    });

    it("should throw 'Wrong password.' 401 if password is wrong", (done) => {
        const req = {
            body: {
                email: "test@test.com",
                password: "test2",
            },
        } as unknown as Request;

        signin(req, res as unknown as Response, next).then((value) => {
            expect(exception).to.have.property("message", "Wrong password.");
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

        signin(req, res as unknown as Response, next).then((value) => {
            expect(res).to.have.property("statusCode", 200);
            expect(res.body).to.have.property("message", "Logged in succesfully.");
            expect(res.body).to.have.property("token");
            done();
        });
    });

    after((done) => {
        User.deleteMany({})
            .then(() => mongoose.disconnect())
            .then(() => done());
    });
});

describe("auth controller - signup", () => {});
