import { NextFunction, Request } from "express";
import { validationResult } from "express-validator";
import { ISavedConnection } from "../models/connection";
import UserService from "../services/database/UserService";

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

    if (!errors.isEmpty()) {
        throw new HttpException("Validation failed.", 422);
    }
};

export const getDiscount = async (req: Request) => {
    if (req.userId) {
        const user = await UserService.getInstance().findById(req.userId);

        if (user && user.discount === "true") {
            return 0.5;
        }
    }

    return 0;
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
