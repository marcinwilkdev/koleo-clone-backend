import { NextFunction, Request, Response } from "express";
import {
    IConnection,
    ISavedConnection,
    ISavedConnectionWithPrice,
} from "../models/connection";
import ConnectionService from "../services/database/ConnectionService";
import { getUserDiscount, handleErrors } from "../util/helpers";
import HttpException from "../util/HttpException";
import {
    AddConnectionResponseBody,
    FindConnectionsResponseBody,
} from "./types/connections";

const sortConnectionsByDepartureDate = (connections: ISavedConnection[]) => {
    connections.sort((first, second) => {
        const firstDepartureDate = first.cities[0].date;
        const secondDepartureDate = second.cities[0].date;

        return firstDepartureDate.getTime() - secondDepartureDate.getTime();
    });
};

const generateConnectionsWithPrices = (
    connections: ISavedConnection[],
    discount: number
) => {
    const connectionsWithPrices: ISavedConnectionWithPrice[] = connections.map(
        (connection) => {
            const connectionPrice = getConnectionPrice(connection, discount);

            return {
                ...connection,
                price: connectionPrice,
            };
        }
    );

    return connectionsWithPrices;
};

export const getConnectionPrice = (
    connection: ISavedConnection,
    discount: number
) => {
    let price = connection.cities
        .slice(0, connection.cities.length - 1)
        .reduce((prev, curr) => prev + curr.price, 0);

    price *= 1 - discount;

    return price;
};

export const addConnection = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const connection = req.body as IConnection;

    try {
        await ConnectionService.getInstance().save(connection);

        const responseBody: AddConnectionResponseBody = {
            message: "Connection added succesfully.",
        };

        res.status(201).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
        return;
    }
};

export const findConnections = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const from = req.query.from as string;
    const to = req.query.to as string;

    try {
        if (!from || !to) {
            throw new HttpException("Couldn't find connections.", 404);
        }

        const discount = await getUserDiscount(req);

        const connections =
            await ConnectionService.getInstance().getConnectionsByCities(
                from,
                to
            );

        sortConnectionsByDepartureDate(connections);

        const connectionsWithPrices = generateConnectionsWithPrices(
            connections,
            discount
        );

        const responseBody: FindConnectionsResponseBody = {
            message: "Connections fetched succesfully.",
            connections: connectionsWithPrices,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
        return;
    }
};
