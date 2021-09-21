import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { handleErrors, validateRequest } from "../util/helpers";
import User from "../models/user";
import HttpException from "../util/HttpException";

interface SigninRequestBody {
    email: string;
    password: string;
}

interface SigninResponseBody {
    message: string;
    token: string;
    userData: string;
}

export const signin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const body = req.body as SigninRequestBody;

    const email = body.email;
    const password = body.password;

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

        let userData = user.email;

        if (user.firstName) {
            userData = user.firstName;
        }

        const responseBody: SigninResponseBody = {
            message: "Logged in succesfully.",
            token,
            userData,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};

interface SignupRequestBody {
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignupResponseBody {
    message: string;
    token: string;
    userData: string;
}

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        validateRequest(req);

        const body = req.body as SignupRequestBody;

        const email = body.email;
        const hashedPassword = await bcryptjs.hash(body.password, 12);

        const user = new User({
            email,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET || "somesupersecret",
            { expiresIn: "1h" }
        );

        const userData = savedUser.email;

        const responseBody: SignupResponseBody = {
            message: "User created succesfully.",
            token,
            userData,
        };

        res.status(201).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};

interface SetDataRequestBody {
    discount: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

interface SetDataResponseBody {
    message: string;
    userData: string;
}

export const setData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const body = req.body as SetDataRequestBody;

    const discount = body.discount;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const dateOfBirth = body.dateOfBirth;

    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new HttpException("User not found.", 404);
        }

        user.discount = discount;
        user.firstName = firstName;
        user.lastName = lastName;
        user.dateOfBirth = new Date(dateOfBirth);

        const savedUser = await user.save();

        let userData = savedUser.email;

        if(savedUser.firstName) {
            userData = savedUser.firstName;
        }

        const responseBody: SetDataResponseBody = {
            message: "User data set succesfully.",
            userData,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};
