import { expect } from "chai";
import { Request, Response } from "express";
import { isAuth } from "../../src/middlewares/is-auth";

import jwt from "jsonwebtoken";
import { stub } from "sinon";

describe("isAuth middleware", () => {
    const res = {} as unknown as Response;

    it("should throw an error when no Authorization header is present", () => {
        const req = {
            get: () => "",
        } as unknown as Request;

        expect(isAuth.bind(null, req, res, () => {})).to.throw(
            "Authorization failed."
        );
    });

    it("should throw an error when Authorization header is incomplete", () => {
        const req = {
            get: () => "Bearer",
        } as unknown as Request;

        expect(isAuth.bind(null, req, res, () => {})).to.throw(
            "Authorization failed."
        );
    });

    it("should throw an error when Authorization header token is wrong", () => {
        const req = {
            get: () => "Bearer xyz",
        } as unknown as Request;

        stub(jwt, "verify");

        (jwt.verify as any).returns(null);

        expect(isAuth.bind(null, req, res, () => {})).to.throw(
            "Authorization failed."
        );

        (jwt.verify as any).restore();
    });

    it("should set req.userId when Authorization header is correct", () => {
        const req = {
            get: () => "Bearer xyz",
        } as unknown as Request;

        stub(jwt, "verify");

        (jwt.verify as any).returns({ userId: "xyz" });

        isAuth(req, res, () => {});

        expect(req.userId).to.be.equal("xyz");

        (jwt.verify as any).restore();
    });
});
