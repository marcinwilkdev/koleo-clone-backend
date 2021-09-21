import { NextFunction, Request, Response } from "express";

import Ticket, { ITicket } from "../models/ticket";
import User from "../models/user";
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

    const userId = req.userId;

    const ticket = new Ticket({
        date,
        arrivalCity,
        departureCity,
        price,
        ticketType,
        trainType,
    });

    try {
        const savedTicket = await ticket.save();

        console.log(savedTicket);

        if (!savedTicket) {
            throw new HttpException("Couldn't create ticket", 500);
        }

        const ticketId = savedTicket._id;

        const user = await User.findById(userId);

        if (!user) {
            throw new HttpException("User not found.", 404);
        }

        user.tickets.push(ticketId);

        await user.save();

        const responseBody: CreateTicketResponseBody = {
            message: "Ticket created succesfully.",
        };

        res.status(201).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};
