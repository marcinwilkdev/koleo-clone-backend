import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import Ticket, { ITicket } from "../models/ticket";
import { handleErrors } from "../util/helpers";
import HttpException from "../util/HttpException";

interface CreateTicketRequestBody {
    date: string;
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

    const userId = req.userId!;
    const ownerId = new Types.ObjectId(userId);

    const ticket = new Ticket({
        date,
        arrivalCity,
        departureCity,
        price,
        ticketType,
        trainType,
        ownerId,
    });

    try {
        const savedTicket = await ticket.save();

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

interface Ticket {
    id: string;
    date: string;
    departureCity: string;
    arrivalCity: string;
    ticketType: string;
    trainType: string;
    price: number;
}

interface GetTicketsResponseBody {
    message: string;
    tickets: Ticket[];
}

const TICKETS_PER_PAGE = 10;

export const getTickets = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const pageNumber = +(req.query.page || 1);
    const userId = req.userId!;
    const ownerId = new Types.ObjectId(userId);

    try {
        const tickets = await Ticket.find({ ownerId })
            .sort({ date: -1 })
            .limit(TICKETS_PER_PAGE)
            .skip((pageNumber - 1) * TICKETS_PER_PAGE);

        const mappedTickets: Ticket[] = tickets.map((ticket) => ({
            id: ticket._id.toString(),
            date: ticket.date.toISOString(),
            arrivalCity: ticket.arrivalCity,
            departureCity: ticket.departureCity,
            price: ticket.price,
            ticketType: ticket.ticketType,
            trainType: ticket.trainType,
        }));

        const responseBody: GetTicketsResponseBody = {
            message: "Tickets fetched successfully.",
            tickets: mappedTickets,
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
    const userId = req.userId!;
    const ownerId = new Types.ObjectId(userId);

    try {
        const ticketsCount = await Ticket.find({ ownerId }).countDocuments();

        const responseBody: GetTicketsCountResponseBody = {
            message: "Tickets count fetched successfully.",
            ticketsCount,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};