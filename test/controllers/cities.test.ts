import { Request } from "express";
import { expect } from "chai";

import { ISavedCity } from "../../src/models/city";

import { addCity, getCities } from "../../src/controllers/cities";

import CityService from "../../src/services/database/CityService";

import { createResponse } from "../createResponse";

const savedCity: ISavedCity = {
    id: "",
    name: "",
};

const req = {
    body: {
        name: ""
    }
} as unknown as Request;

describe("cities controller - getCities", () => {
    const res = createResponse();

    before(() => {
        CityService.init({
            findAll: async () => [],
            save: async () => savedCity,
        });
    });

    it("should send correct response if cities have been fetched", (done) => {
        getCities(req, res, () => {}).then(() => {
            expect(res).to.have.property("statusCode", 200);
            expect(res.body).to.have.property("message", "Cities fetched succesfully.");

            done();
        });
    });
});

describe("cities controller - addCity", () => {
    const res = createResponse();

    before(() => {
        CityService.init({
            findAll: async () => [],
            save: async () => savedCity,
        });
    });

    it("should send correct response if city has been added", (done) => {
        addCity(req, res, () => {}).then(() => {
            expect(res).to.have.property("statusCode", 201);
            expect(res.body).to.have.property("message", "City added succesfully.");

            done();
        });
    });
});