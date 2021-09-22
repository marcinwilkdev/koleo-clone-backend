import { NextFunction, Request, Response } from "express";

import TicketService from "../services/database/TicketService";

import { handleErrors } from "../util/helpers";
import HttpException from "../util/HttpException";

import { ITicket } from "../models/ticket";

import {
    CreateTicketRequestBody,
    CreateTicketResponseBody,
    GetTicketsCountResponseBody,
    GetTicketsResponseBody,
} from "./types/ticket";

const TICKETS_PER_PAGE = 10;

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

        const savedTicket = await TicketService.getInstance().save(ticket);

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

        const responseBody: GetTicketsResponseBody = {
            message: "Tickets fetched successfully.",
            tickets,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};

export const getTicketsCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const ownerId = req.userId!;

    try {
        const ticketsCount = await TicketService.getInstance().countAllByOwnerId(ownerId);

        const responseBody: GetTicketsCountResponseBody = {
            message: "Tickets count fetched successfully.",
            ticketsCount,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};
