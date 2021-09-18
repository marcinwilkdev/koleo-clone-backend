import { expect } from "chai";
import { Request, Response } from "express";

import { isAuth } from "../src/middlewares/is-auth";

describe("try first tests", () => {
    it("should run first test", () => {
        const req = {
            get: () => "Authorization"
        } as unknown as Request;

        const res = {} as unknown as Response;

        expect(isAuth.bind(null, req, res, () => {})).to.throw("Authorization failed.");
    })
});