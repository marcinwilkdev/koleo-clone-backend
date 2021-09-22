import { NextFunction, Request } from "express";
import { validationResult } from "express-validator";

import HttpException from "./HttpException";

export const handleErrors = (err: any, next: NextFunction) => {
    let errorMessage = "Something went wrong.";
    let statusCode = 500;

    if (err.message) {
        errorMessage = err.message;
    }

    if (err.statusCode) {
        statusCode = err.statusCode;
    }

    const exception = new HttpException(errorMessage, statusCode);

    next(exception);
};

export const validateRequest = (req: Request) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        throw new HttpException("Validation failed.", 422);
    }
};
