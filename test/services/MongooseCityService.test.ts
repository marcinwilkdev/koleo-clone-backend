import { expect } from "chai";
import mongoose from "mongoose";
import { ICity } from "../../src/models/city";

import MongooseCityService from "../../src/services/database/implementations/MongooseCityService";
import { TEST_DB_URL } from "./MongooseDatabase";

const mongooseCityService = new MongooseCityService();

const afterTests = (done: Mocha.Done) => {
    mongooseCityService
        .deleteAll()
        .then(() => mongoose.disconnect())
        .then(() => done());
};

const cityToSave: ICity = {
    name: "xyz",
};

describe("MongooseCityService - save", () => {
    before((done) => {
        mongoose.connect(TEST_DB_URL).then(() => done());
    });

    it("should return saved city when succeed", (done) => {
        mongooseCityService.save(cityToSave).then((savedCity) => {
            expect(savedCity).to.have.property("id");
            expect(savedCity).to.have.property("name", "xyz");

            done();
        });
    });

    after((done) => afterTests(done));
});

describe("MongooseCityService - findAll", () => {
    before((done) => {
        mongoose
            .connect(TEST_DB_URL)
            .then(() => mongooseCityService.save(cityToSave))
            .then(() => mongooseCityService.save(cityToSave))
            .then(() => done());
    });

    it("should return all cities when succeed", (done) => {
        mongooseCityService.findAll().then((foundCities) => {
            expect(foundCities.length).to.be.equal(2);

            done();
        });
    });

    after((done) => afterTests(done));
});
