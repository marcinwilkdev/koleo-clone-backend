import { NextFunction, Request, Response } from "express";
import { IConnection, ISavedConnectionWithPrice } from "../models/connection";
import ConnectionService from "../services/database/ConnectionService";
import UserService from "../services/database/UserService";
import { getConnectionPrice, getDiscount, handleErrors } from "../util/helpers";
import HttpException from "../util/HttpException";
import {
    AddConnectionResponseBody,
    FindConnectionsResponseBody,
} from "./types/connections";

export const addConnection = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const connection = req.body as IConnection;

    try {
        const savedConnection = await ConnectionService.getInstance().save(
            connection
        );

        const responseBody: AddConnectionResponseBody = {
            message: "Connection added succesfully.",
        };

        res.status(201).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
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

        const connections =
            await ConnectionService.getInstance().getConnectionsByCities(
                from,
                to
            );

        const discount = await getDiscount(req);

        const connectionsWithPrice: ISavedConnectionWithPrice[] =
            connections.map((connection) => {
                const price = getConnectionPrice(connection, discount);

                return {
                    ...connection,
                    price,
                };
            });

        const responseBody: FindConnectionsResponseBody = {
            message: "Connections fetched succesfully.",
            connections: connectionsWithPrice,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};
