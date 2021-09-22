import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { ticketService } from "../app";
import { ISavedTicket, ITicket } from "../models/ticket";

import { handleErrors } from "../util/helpers";
import HttpException from "../util/HttpException";

const TICKETS_PER_PAGE = 10;

interface CreateTicketRequestBody {
    date: Date;
    departureCity: string;
    arrivalCity: string;
    ticketType: string;
    trainType: string;
    price: number;
}

interface CreateTicketResponseBody {
    message: string;
}

export const createTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { date, arrivalCity, departureCity, price, ticketType, trainType } =
        req.body as CreateTicketRequestBody;

    const ownerId = req.userId!;

    try {
        const ticket: ITicket = {
            date,
            arrivalCity,
            departureCity,
            price,
            ticketType,
            trainType,
            ownerId,
        };

        const savedTicket = await ticketService.save(ticket);

        if (!savedTicket) {
            throw new HttpException("Couldn't create ticket", 500);
        }

        const responseBody: CreateTicketResponseBody = {
            message: "Ticket created succesfully.",
        };

        res.status(201).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};

interface GetTicketsResponseBody {
    message: string;
    tickets: ISavedTicket[];
}

export const getTickets = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const pageNumber = +(req.query.page || 1);
    const ownerId = req.userId!;

    try {
        const tickets = await ticketService.findAllByOwnerIdPaged(
            ownerId,
            TICKETS_PER_PAGE,
            pageNumber
        );

        const responseBody: GetTicketsResponseBody = {
            message: "Tickets fetched successfully.",
            tickets,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};

interface GetTicketsCountResponseBody {
    message: string;
    ticketsCount: number;
}

export const getTicketsCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const ownerId = req.userId!;

    try {
        const ticketsCount = await ticketService.countAllByOwnerId(ownerId);

        const responseBody: GetTicketsCountResponseBody = {
            message: "Tickets count fetched successfully.",
            ticketsCount,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};
