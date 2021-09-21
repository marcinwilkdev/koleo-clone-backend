import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { handleErrors, validateRequest } from "../util/helpers";
import User from "../models/user";
import HttpException from "../util/HttpException";

export const signin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new HttpException("User not found.", 404);
        }

        const isPasswordEqual = await bcryptjs.compare(password, user.password);

        if (!isPasswordEqual) {
            throw new HttpException("Wrong password.", 401);
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET || "somesupersecret",
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Logged in succesfully.", token });
    } catch (err) {
        handleErrors(err, next);
    }
};

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

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET || "somesupersecret",
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "User created succesfully.", token });
    } catch (err) {
        handleErrors(err, next);
    }
};

export const setData = async (req: Request, res: Response, next: NextFunction) => {
    
};
