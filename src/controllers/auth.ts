import { NextFunction, Request, Response } from "express";

import WebTokenService from "../services/other/WebTokenService";
import EncryptionService from "../services/other/EncryptionService";
import UserService from "../services/database/UserService";

import { handleErrors, validateRequest } from "../util/helpers";
import HttpException from "../util/HttpException";

import { IUser } from "../models/user";

import {
    SetDataRequestBody,
    SetDataResponseBody,
    SigninRequestBody,
    SigninResponseBody,
    SignupRequestBody,
    SignupResponseBody,
} from "./types/auth";

export const signin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const body = req.body as SigninRequestBody;

    const email = body.email;
    const password = body.password;

    try {
        const user = await UserService.getInstance().findByEmail(email);

        if (!user) {
            throw new HttpException("User not found.", 404);
        }

        const isPasswordEqual = await EncryptionService.getInstance().compare(
            password,
            user.password
        );

        if (!isPasswordEqual) {
            throw new HttpException("Wrong password.", 401);
        }

        const token = WebTokenService.getInstance().sign({ userId: user.id }, 1);

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

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        validateRequest(req);

        const body = req.body as SignupRequestBody;

        const email = body.email;
        const hashedPassword = await EncryptionService.getInstance().hash(body.password, 12);

        const user: IUser = {
            email,
            password: hashedPassword,
        };

        const savedUser = await UserService.getInstance().save(user);

        const token = WebTokenService.getInstance().sign({ userId: savedUser.id }, 1);

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

    const userId = req.userId!;

    try {
        const user = await UserService.getInstance().findById(userId);

        if (!user) {
            throw new HttpException("User not found.", 404);
        }

        user.discount = discount;
        user.firstName = firstName;
        user.lastName = lastName;
        user.dateOfBirth = dateOfBirth;

        const savedUser = await UserService.getInstance().update(user);

        let userData = savedUser.email;

        if (savedUser.firstName) {
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
