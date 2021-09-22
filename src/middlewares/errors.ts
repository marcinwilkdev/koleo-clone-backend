import { NextFunction, Request, Response } from "express";

import HttpException from "../util/HttpException";

interface ErrorResponseBody {
    errorMessage: string;
}

export const errorsHandler = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode;

    const responseBody: ErrorResponseBody = {
        errorMessage: err.message,
    };

    res.status(statusCode).json(responseBody);
};
