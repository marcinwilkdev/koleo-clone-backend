import { ISavedTicket } from "../../src/models/ticket";

import { createTicket, getTickets, getTicketsCount } from "../../src/controllers/tickets";

import TicketService from "../../src/services/database/TicketService";

import { createResponse } from "../createResponse";
import { Request } from "express";
import { expect } from "chai";

const savedTicket: ISavedTicket = {
    id: "",
    date: new Date(),
    arrivalCity: "",
    departureCity: "",
    price: 0,
    ticketType: "",
    trainType: "",
    ownerId: "",
};

const req = {
    body: {
        date: new Date(),
        arrivalCity: "",
        departureCity: "",
        price: 0,
        ticketType: "",
        trainType: "",
        ownerId: "",
    },
    userId: "",
    query: {
        page: "",
    },
} as unknown as Request;

describe("tickets controller - createTicket", () => {
    const res = createResponse();

    before(() => {
        TicketService.init({
            countAllByOwnerId: async () => 0,
            findAllByOwnerIdPaged: async () => [],
            save: async () => savedTicket,
        });
    });

    it("should send correct response if ticket has been created", (done) => {
        createTicket(req, res, () => {}).then(() => {
            expect(res).to.have.property("statusCode", 201);
            expect(res.body).to.have.property(
                "message",
                "Ticket created succesfully."
            );

            done();
        });
    });
});

describe("tickets controller - getTickets", () => {
    const res = createResponse();

    before(() => {
        TicketService.init({
            countAllByOwnerId: async () => 0,
            findAllByOwnerIdPaged: async () => [],
            save: async () => savedTicket,
        });
    });

    it("should send correct response if ticket have been fetched", (done) => {
        getTickets(req, res, () => {}).then(() => {
            expect(res).to.have.property("statusCode", 200);
            expect(res.body).to.have.property(
                "message",
                "Tickets fetched successfully."
            );

            done();
        });
    });
});

describe("tickets controller - getTicketsCount", () => {
    const res = createResponse();

    before(() => {
        TicketService.init({
            countAllByOwnerId: async () => 0,
            findAllByOwnerIdPaged: async () => [],
            save: async () => savedTicket,
        });
    });

    it("should send correct response if tickets count has been fetched", (done) => {
        getTicketsCount(req, res, () => {}).then(() => {
            expect(res).to.have.property("statusCode", 200);
            expect(res.body).to.have.property(
                "message",
                "Tickets count fetched successfully."
            );

            done();
        });
    });
});
