import { NextFunction, Request, Response } from "express";

import TicketService from "../services/database/TicketService";

import { getUserDiscount, handleErrors } from "../util/helpers";
import HttpException from "../util/HttpException";

import { ISavedTicket, ITicket } from "../models/ticket";

import {
    CreateTicketRequestBody,
    CreateTicketResponseBody,
    GetTicketsCountResponseBody,
    GetTicketsResponseBody,
} from "./types/ticket";
import ConnectionService from "../services/database/ConnectionService";
import { ISavedConnection } from "../models/connection";
import { getConnectionPrice } from "./connections";

const TICKETS_PER_PAGE = 10;

const sortTicketsByDate = (tickets: ISavedTicket[]) => {
    tickets.sort((first, second) => {
        const firstDateInMilliseconds = first.date.getTime();
        const secondDateInMilliseconds = second.date.getTime();

        return firstDateInMilliseconds - secondDateInMilliseconds;
    });
};

const trimConnection = (
    connection: ISavedConnection,
    departureCity: string,
    arrivalCity: string
) => {
    const cities = connection.cities;

    const arrivalCityIndex = cities.findIndex(
        (city) => city.city.name === arrivalCity
    );
    const departureCityIndex = cities.findIndex(
        (city) => city.city.name === departureCity
    );

    if (arrivalCityIndex < 0 || departureCityIndex < 0) {
        throw new HttpException("City not found.", 404);
    }

    const preparedCities = cities.slice(
        departureCityIndex,
        arrivalCityIndex + 1
    );

    const preparedConnection: ISavedConnection = {
        ...connection,
        cities: preparedCities,
    };

    return preparedConnection;
};

export const createTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const body = req.body as CreateTicketRequestBody;

    const ownerId = req.userId!;

    try {
        const connection = await ConnectionService.getInstance().findById(
            body.id
        );

        if (!connection) {
            throw new HttpException("Connection not found.", 404);
        }

        const date = new Date();
        const trainType = connection.trainType;
        const departureCity = body.departureCity;
        const arrivalCity = body.arrivalCity;

        const preparedConnection = trimConnection(
            connection,
            departureCity,
            arrivalCity
        );

        const discount = await getUserDiscount(req);

        const price = getConnectionPrice(preparedConnection, discount);

        const ticket: ITicket = {
            date,
            arrivalCity,
            departureCity,
            price,
            ticketType: "jednorazowy",
            trainType,
            ownerId,
        };

        await TicketService.getInstance().save(ticket);

        const responseBody: CreateTicketResponseBody = {
            message: "Ticket created succesfully.",
        };

        res.status(201).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
        return;
    }
};

export const getTickets = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const pageNumber = +(req.query.page || 1);
    const ownerId = req.userId!;

    try {
        const tickets = await TicketService.getInstance().findAllByOwnerIdPaged(
            ownerId,
            TICKETS_PER_PAGE,
            pageNumber
        );

        sortTicketsByDate(tickets);

        const responseBody: GetTicketsResponseBody = {
            message: "Tickets fetched successfully.",
            tickets,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
        return;
    }
};

export const getTicketsCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const ownerId = req.userId!;

    try {
        const ticketsCount =
            await TicketService.getInstance().countAllByOwnerId(ownerId);

        const responseBody: GetTicketsCountResponseBody = {
            message: "Tickets count fetched successfully.",
            ticketsCount,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
        return;
    }
};
