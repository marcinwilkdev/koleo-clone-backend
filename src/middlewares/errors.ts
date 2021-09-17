import { NextFunction, Request, Response } from "express";
import HttpException from "../util/HttpException";

export const errorsHandler = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.statusCode).json({ message: err.message });
};
