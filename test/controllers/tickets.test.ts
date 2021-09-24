import { ISavedTicket } from "../../src/models/ticket";

import { createTicket, getTickets, getTicketsCount } from "../../src/controllers/tickets";

import TicketService from "../../src/services/database/TicketService";

import { createResponse } from "../createResponse";
import { NextFunction, Request } from "express";
import { expect } from "chai";
import UserService from "../../src/services/database/UserService";
import { ISavedUser } from "../../src/models/user";
import ConnectionService from "../../src/services/database/ConnectionService";
import { ISavedConnection } from "../../src/models/connection";
import HttpException from "../../src/util/HttpException";

const savedUser: ISavedUser = {
    id: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
    discount: "",
    firstName: "",
    lastName: "",
};

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

const savedConnection: ISavedConnection = {
    cities: [],
    trainType: "",
    id: "",
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
    userId: "xyz",
    query: {
        page: "",
    },
} as unknown as Request;

describe("tickets controller - createTicket", () => {
    const res = createResponse();

    let exception: null | HttpException;

    const next = ((exc: HttpException) => {
        exception = exc;
    }) as unknown as NextFunction;

    before(() => {
        TicketService.init({
            countAllByOwnerId: async () => 0,
            findAllByOwnerIdPaged: async () => [],
            save: async () => savedTicket,
        });

        ConnectionService.init({
            findById: async () => null,
            getConnectionsByCities: async () => [],
            save: async () => savedConnection,
        });

        UserService.init({
            save: async () => savedUser,
            update: async () => savedUser,
            findByEmail: async () => null,
            findById: async () => null,
        });
    });

    it("should throw 'Connection not found.' if connection hasn't been found", (done) => {
        createTicket(req, res, next).then(() => {
            expect(exception).to.have.property("message", "Connection not found.");

            done();
        });
    })

    it("should throw 'City not found.' if city hasn't been found", (done) => {
        ConnectionService.getInstance().findById = async () => savedConnection;

        createTicket(req, res, next).then(() => {
            expect(exception).to.have.property("message", "City not found.");

            done();
        });
    })

    it("should send correct response if ticket has been created", (done) => {
        req.body.arrivalCity = "xyz";
        req.body.departureCity = "xyz";

        savedConnection.cities.push({
            city: {
                id: "",
                name: "xyz"
            },
            date: new Date(),
            price: 0
        });

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
