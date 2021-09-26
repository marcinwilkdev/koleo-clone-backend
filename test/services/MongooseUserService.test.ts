import { expect } from "chai";
import mongoose from "mongoose";
import { ISavedUser, IUser } from "../../src/models/user";

import MongooseUserService from "../../src/services/database/implementations/MongooseUserService";
import { TEST_DB_URL } from "./MongooseDatabase";

const mongooseUserService = new MongooseUserService();

const afterTests = (done: Mocha.Done) => {
    mongooseUserService
        .deleteAll()
        .then(() => mongoose.disconnect())
        .then(() => done());
};

const userToSave: IUser = {
    email: "xyz",
    password: "xyz",
};

describe("MongooseUserService - save", () => {
    before((done) => {
        mongoose.connect(TEST_DB_URL).then(() => done());
    });

    it("should return saved user when succeed", (done) => {
        mongooseUserService.save(userToSave).then((savedUser) => {
            expect(savedUser).to.have.property("id");
            expect(savedUser).to.have.property("email", "xyz");
            expect(savedUser).to.have.property("password", "xyz");

            done();
        });
    });

    after((done) => afterTests(done));
});

describe("MongooseUserService - findById", () => {
    let id: string = "";

    before((done) => {
        mongoose
            .connect(TEST_DB_URL)
            .then(() => mongooseUserService.save(userToSave))
            .then((savedConnection) => {
                id = savedConnection.id;

                done();
            });
    });

    it("should return null when user with such id isn't present", (done) => {
        let wrongId = "5ddf784f9dbb9f1530b96020";

        if (wrongId === id) {
            wrongId = "5ddf76af01c5992ec4fa1c9c";
        }

        mongooseUserService.findById(wrongId).then((foundUser) => {
            expect(foundUser).to.be.equal(null);

            done();
        });
    });

    it("should return found user when user with such id present", (done) => {
        mongooseUserService.findById(id).then((foundUser) => {
            expect(foundUser).to.have.property("id", id);
            expect(foundUser).to.have.property("email", "xyz");
            expect(foundUser).to.have.property("password", "xyz");

            done();
        });
    });

    after((done) => afterTests(done));
});

describe("MongooseUserService - findByEmail", () => {
    before((done) => {
        mongoose
            .connect(TEST_DB_URL)
            .then(() => mongooseUserService.save(userToSave))
            .then(() => done());
    });

    it("should return null when user with such email isn't present", (done) => {
        mongooseUserService.findByEmail("abc").then((foundUser) => {
            expect(foundUser).to.be.equal(null);

            done();
        });
    });

    it("should return found user when user with such email present", (done) => {
        mongooseUserService.findByEmail("xyz").then((foundUser) => {
            expect(foundUser).to.have.property("email", "xyz");
            expect(foundUser).to.have.property("password", "xyz");

            done();
        });
    });

    after((done) => afterTests(done));
});

describe("MongooseUserService - update", () => {
    let savedUser: ISavedUser;

    before((done) => {
        mongoose
            .connect(TEST_DB_URL)
            .then(() => mongooseUserService.save(userToSave))
            .then((user) => {
                savedUser = user;

                done();
            });
    });

    it("should return updated user when user got updated", (done) => {
        savedUser.firstName = "xyz";

        mongooseUserService.update(savedUser).then((updatedUser) => {
            expect(updatedUser).to.have.property("firstName", "xyz");

            done();
        });
    });

    it("should update user when user got updated", (done) => {
        mongooseUserService.findById(savedUser.id).then((foundUser) => {
            expect(foundUser).to.have.property("firstName", "xyz");

            done();
        });
    });

    after((done) => afterTests(done));
});
