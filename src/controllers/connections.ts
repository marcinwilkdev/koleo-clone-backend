import { NextFunction, Request, Response } from "express";
import { IConnection } from "../models/connection";
import ConnectionService from "../services/database/ConnectionService";
import { handleErrors } from "../util/helpers";
import { AddConnectionResponseBody } from "./types/connections";

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
