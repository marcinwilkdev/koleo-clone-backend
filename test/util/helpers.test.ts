import { NextFunction } from "express";

import { expect } from "chai";

import { handleErrors } from "../../src/util/helpers";
import HttpException from "../../src/util/HttpException";

describe("handle errors", () => {
    let exception: HttpException | null;

    beforeEach(() => {
        exception = null;
    })

    it("should send 'Something went wrong.' 500 http exception if no err passed", () => {
        const err = {};

        const next = (exc: HttpException) => {
            exception = exc;
        };

        handleErrors(err, next as unknown as NextFunction);

        expect(exception?.message).to.equal("Something went wrong.");
        expect(exception?.statusCode).to.equal(500);
    });

    it("should send custom http exception if err passed", () => {
        const err = {
            message: "Test message",
            statusCode: 400,
        };
        
        const next = (exc: HttpException) => {
            exception = exc;
        };

        handleErrors(err, next as unknown as NextFunction);

        expect(exception?.message).to.equal("Test message");
        expect(exception?.statusCode).to.equal(400);
    });
});
