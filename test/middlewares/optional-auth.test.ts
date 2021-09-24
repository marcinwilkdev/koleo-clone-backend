import { Request } from "express";
import { expect } from "chai";

import { isAuth } from "../../src/middlewares/is-auth";

import WebTokenService from "../../src/services/other/WebTokenService";

import { createResponse } from "../createResponse";

describe("optionalAuth middleware", () => {
    const res = createResponse();

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

        isAuth(req, res, () => {});

        expect(req).not.to.have.property("userId");
    });

    it("should throw an error when Authorization header is incomplete", () => {
        const req = {
            get: () => "Bearer",
        } as unknown as Request;

        isAuth(req, res, () => {});

        expect(req).not.to.have.property("userId");
    });

    it("should throw an error when Authorization header token is wrong", () => {
        const req = {
            get: () => "Bearer xyz",
        } as unknown as Request;

        isAuth(req, res, () => {});

        expect(req).not.to.have.property("userId");
    });

    it("should set req.userId when Authorization header is correct", () => {
        WebTokenService.getInstance().verify = () => ({
            userId: "xyz",
        });

        const req = {
            get: () => "Bearer xyz",
        } as unknown as Request & { userId: string };

        isAuth(req, res, () => {});

        expect(req).to.have.property("userId", "xyz");
    });
});
