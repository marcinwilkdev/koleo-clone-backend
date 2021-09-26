import { expect } from "chai";
import mongoose from "mongoose";
import { ITicket } from "../../src/models/ticket";

import MongooseTicketService from "../../src/services/database/implementations/MongooseTicketService";

const TEST_DB_URL =
    "mongodb+srv://root:D7alUq7tPN5yVyxK@cluster0.hew9q.mongodb.net/koleo-dev-test?retryWrites=true&w=majority";

const mongooseTicketService = new MongooseTicketService();

const ticketToSave: ITicket = {
    arrivalCity: "xyz",
    departureCity: "xyz",
    ownerId: "xyz",
    ticketType: "xyz",
    trainType: "xyz",
    date: new Date(),
    price: 0,
};

describe("MongooseConnectionService - save", () => {
    before((done) => {
        mongoose.connect(TEST_DB_URL).then(() => done());
    });

    it("should return saved ticket when succeed", (done) => {
        mongooseTicketService.save(ticketToSave).then((savedTicket) => {
            expect(savedTicket).to.have.property("id");
            expect(savedTicket).to.have.property("arrivalCity", "xyz");
            expect(savedTicket).to.have.property("departureCity", "xyz");
            expect(savedTicket).to.have.property("ownerId", "xyz");
            expect(savedTicket).to.have.property("ticketType", "xyz");
            expect(savedTicket).to.have.property("trainType", "xyz");
            expect(savedTicket).to.have.property("date");
            expect(savedTicket).to.have.property("price", 0);

            done();
        });
    });

    after((done) => {
        mongooseTicketService
            .deleteAll()
            .then(() => mongoose.disconnect())
            .then(() => done());
    });
});

describe("MongooseConnectionService - countAllByOwnerId", () => {
    before((done) => {
        mongoose
            .connect(TEST_DB_URL)
            .then(() => mongooseTicketService.save(ticketToSave))
            .then(() => mongooseTicketService.save(ticketToSave))
            .then(() => done());
    });

    it("should return 0 when tickets for owner not found", (done) => {
        mongooseTicketService.countAllByOwnerId("abc").then((count) => {
            expect(count).to.be.equal(0);

            done();
        });
    });

    it("should return correct count when tickets for owner found", (done) => {
        mongooseTicketService.countAllByOwnerId("xyz").then((count) => {
            expect(count).to.be.equal(2);

            done();
        });
    });

    after((done) => {
        mongooseTicketService
            .deleteAll()
            .then(() => mongoose.disconnect())
            .then(() => done());
    });
});

describe("MongooseConnectionService - findAllByOwnerIdPaged", () => {
    before((done) => {
        mongoose
            .connect(TEST_DB_URL)
            .then(() => mongooseTicketService.save(ticketToSave))
            .then(() => mongooseTicketService.save(ticketToSave))
            .then(() => done());
    });

    it("should return empty array when tickets for owner not found", (done) => {
        mongooseTicketService.findAllByOwnerIdPaged("abc", 1, 1).then((foundTickets) => {
            expect(foundTickets.length).to.be.equal(0);

            done();
        });
    });

    it("should return part of tickets if there are more tickets than perPage", (done) => {
        mongooseTicketService.findAllByOwnerIdPaged("xyz", 1, 1).then((foundTickets) => {
            expect(foundTickets.length).to.be.equal(1);

            done();
        });
    });

    it("should return some tickets if there should be tickets on page", (done) => {
        mongooseTicketService.findAllByOwnerIdPaged("xyz", 1, 2).then((foundTickets) => {
            expect(foundTickets.length).to.be.equal(1);

            done();
        });
    });

    it("should return empty array if there shouldn't be tickets on page", (done) => {
        mongooseTicketService.findAllByOwnerIdPaged("xyz", 1, 3).then((foundTickets) => {
            expect(foundTickets.length).to.be.equal(0);

            done();
        });
    });

    it("should return all tickets if there is less tickets than perPage", (done) => {
        mongooseTicketService.findAllByOwnerIdPaged("xyz", 3, 1).then((foundTickets) => {
            expect(foundTickets.length).to.be.equal(2);

            done();
        });
    });

    after((done) => {
        mongooseTicketService
            .deleteAll()
            .then(() => mongoose.disconnect())
            .then(() => done());
    });
});
