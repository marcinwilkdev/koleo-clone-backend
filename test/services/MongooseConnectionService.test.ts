import { expect } from "chai";
import mongoose from "mongoose";

import { IConnection } from "../../src/models/connection";
import MongooseConnectionService from "../../src/services/database/implementations/MongooseConnectionService";

const TEST_DB_URL =
    "mongodb+srv://root:D7alUq7tPN5yVyxK@cluster0.hew9q.mongodb.net/koleo-dev-test?retryWrites=true&w=majority";

const mongooseConnectionService = new MongooseConnectionService();

const connectionToSave: IConnection = {
    cities: [],
    trainType: "xyz",
};

describe("MongooseConnectionService - save", () => {
    before((done) => {
        mongoose.connect(TEST_DB_URL).then(() => done());
    });

    it("should return saved connection when succeed", (done) => {
        mongooseConnectionService
            .save(connectionToSave)
            .then((savedConnection) => {
                expect(savedConnection).to.have.property("id");
                expect(savedConnection).to.have.property("cities");
                expect(savedConnection).to.have.property("trainType", "xyz");

                done();
            });
    });

    after((done) => {
        mongooseConnectionService
            .deleteAll()
            .then(() => mongoose.disconnect())
            .then(() => done());
    });
});

describe("MongooseConnectionService - findById", () => {
    let id: string = "";

    before((done) => {
        mongoose
            .connect(TEST_DB_URL)
            .then(() => mongooseConnectionService.save(connectionToSave))
            .then((savedConnection) => {
                id = savedConnection.id;

                done();
            });
    });

    it("should return found connection when succeed", (done) => {
        mongooseConnectionService.findById(id).then((foundConnection) => {
            expect(foundConnection).to.have.property("id", id);
            expect(foundConnection).to.have.property("cities");
            expect(foundConnection).to.have.property("trainType", "xyz");

            done();
        });
    });

    after((done) => {
        mongooseConnectionService
            .deleteAll()
            .then(() => mongoose.disconnect())
            .then(() => done());
    });
});

describe("MongooseConnectionService - getConnectionsByCities", () => {
    const nextHour = new Date();
    nextHour.setHours(nextHour.getHours() + 1);

    const connection: IConnection = {
        cities: [
            {
                city: {
                    name: "xyz",
                    id: "xyz",
                },
                price: 1,
                date: new Date(),
            },
            {
                city: {
                    name: "abc",
                    id: "abc",
                },
                price: 0,
                date: nextHour,
            },
        ],
        trainType: "xyz",
    };

    before((done) => {
        mongoose
            .connect(TEST_DB_URL)
            .then(() => mongooseConnectionService.save(connection))
            .then(() => done());
    });

    it("should return empty array when wrong way", (done) => {
        mongooseConnectionService.getConnectionsByCities("abc", "xyz").then((foundConnections) => {
            expect(foundConnections.length).to.be.equal(0);

            done();
        });
    });

    it("should return found connections when succeed", (done) => {
        mongooseConnectionService.getConnectionsByCities("xyz", "abc").then((foundConnections) => {
            expect(foundConnections.length).to.be.equal(1);
            expect(foundConnections[0]).to.have.property("trainType", "xyz");

            done();
        });
    });

    after((done) => {
        mongooseConnectionService
            .deleteAll()
            .then(() => mongoose.disconnect())
            .then(() => done());
    });
});
