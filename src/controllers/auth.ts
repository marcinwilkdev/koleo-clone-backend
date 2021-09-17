import { NextFunction, Request, Response } from "express";
import { handleErrors, validateRequest } from "../util/helpers";

export const signin = (req: Request, res: Response, next: NextFunction) => {};

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        validateRequest(req);
        res.status(200).json({ message: "SUCCESS" });
    } catch (err) {
        handleErrors(err, next);
    }
};
