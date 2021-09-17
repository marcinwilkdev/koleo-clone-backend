import { NextFunction } from "express";
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
