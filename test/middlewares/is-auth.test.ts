import { Request, Response } from "express";
import { expect } from "chai";

import { isAuth } from "../../src/middlewares/is-auth";

import WebTokenService from "../../src/services/other/WebTokenService";

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
        WebTokenService.init({
            secret: "",
            sign: () => "",
            verify: () => "",
        });

        const req = {
            get: () => "Bearer xyz",
        } as unknown as Request;

        expect(isAuth.bind(null, req, res, () => {})).to.throw(
            "Authorization failed."
        );
    });

    it("should set req.userId when Authorization header is correct", () => {
        WebTokenService.init({
            secret: "",
            sign: () => "",
            verify: () => ({
                userId: "xyz",
            }),
        });

        const req = {
            get: () => "Bearer xyz",
        } as unknown as Request & { userId: string };

        isAuth(req, res, () => {});

        expect(req.userId).to.be.equal("xyz");
    });
});
