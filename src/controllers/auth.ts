import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { handleErrors, validateRequest } from "../util/helpers";
import User from "../models/user";

export const signin = (req: Request, res: Response, next: NextFunction) => {};

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        validateRequest(req);

        const email = req.body.email;
        const hashedPassword = await bcryptjs.hash(req.body.password, 12);

        const user = new User({
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: "User created succesfully." });
    } catch (err) {
        handleErrors(err, next);
    }
};
