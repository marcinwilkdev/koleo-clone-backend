import { NextFunction, Request, Response } from "express";

import WebTokenService from "../services/other/WebTokenService";
import EncryptionService from "../services/other/EncryptionService";
import UserService from "../services/database/UserService";

import { handleErrors, validateRequest } from "../util/helpers";
import HttpException from "../util/HttpException";

import { ISavedUser, IUser } from "../models/user";

import {
    GetDataResponseBody,
    SetDataRequestBody,
    SetDataResponseBody,
    SigninRequestBody,
    SigninResponseBody,
    SignupRequestBody,
    SignupResponseBody,
} from "./types/auth";

const generateUserData = (user: ISavedUser) => {
    let userData = user.email;

    if (user.firstName) {
        userData = user.firstName;
    }

    return userData;
};

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

        const token = WebTokenService.getInstance().sign(
            { userId: user.id },
            1
        );

        const userData = generateUserData(user);

        const responseBody: SigninResponseBody = {
            message: "Logged in succesfully.",
            token,
            userData,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
        return;
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
        const hashedPassword = await EncryptionService.getInstance().hash(
            body.password,
            12
        );

        const user: IUser = {
            email,
            password: hashedPassword,
        };

        const savedUser = await UserService.getInstance().save(user);

        const token = WebTokenService.getInstance().sign(
            { userId: savedUser.id },
            1
        );

        const userData = generateUserData(savedUser);

        const responseBody: SignupResponseBody = {
            message: "User created succesfully.",
            token,
            userData,
        };

        res.status(201).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
        return;
    }
};

export const setData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const body = req.body as SetDataRequestBody;

    const userId = req.userId!;

    try {
        const user = await UserService.getInstance().findById(userId);

        if (!user) {
            throw new HttpException("User not found.", 404);
        }

        user.discount = body.discount;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.dateOfBirth = body.dateOfBirth;

        const savedUser = await UserService.getInstance().update(user);

        const userData = generateUserData(savedUser);

        const responseBody: SetDataResponseBody = {
            message: "User data set succesfully.",
            userData,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
        return;
    }
};

export const getData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.userId!;

    try {
        const user = await UserService.getInstance().findById(userId);

        if (!user) {
            throw new HttpException("User not found.", 404);
        }

        const responseBody: GetDataResponseBody = {
            message: "User data fetched succesfully.",
            firstName: user.firstName || null,
            lastName: user.lastName || null,
            dateOfBirth: user.dateOfBirth || null
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};
