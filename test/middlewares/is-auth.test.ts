import { expect } from "chai";
import { Request, Response } from "express";
import { isAuth } from "../../src/middlewares/is-auth";
import { WebTokenService } from "../../src/services/WebTokenService";

describe("isAuth middleware", () => {
    const res = {} as unknown as Response;

    before(() => {
        WebTokenService.init({
            secret: "",
            sign: () => "",
            verify: () => "",
        });
    });

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

        expect(isAuth.bind(null, req, res, () => {})).to.throw(
            "Authorization failed."
        );
    });

    // it("should set req.userId when Authorization header is correct", () => {
    //     const req = {
    //         get: () => "Bearer xyz",
    //     } as unknown as Request;

    //     stub(jwt, "verify");

    //     (jwt.verify as any).returns({ userId: "xyz" });

    //     isAuth(req, res, () => {});

    //     expect(req.userId).to.be.equal("xyz");

    //     (jwt.verify as any).restore();
    // });
});
