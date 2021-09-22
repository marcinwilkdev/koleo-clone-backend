import { NextFunction, Request, Response } from "express";

import { webTokenService } from "../app";

import HttpException from "../util/HttpException";

interface AuthPayload {
    userId: string;
}

const getAuthHeader = (req: Request) => {
    const authHeader = req.get("Authorization");

    if(!authHeader) {
        throw new HttpException("Authorization failed.", 401);
    }

    return authHeader;
};

const getTokenFromHeader = (authHeader: string) => {
    const token = authHeader.split(" ")[1];

    if(!token) {
        throw new HttpException("Authorization failed.", 401);
    }

    return token;
}

const getPayloadFromToken = (token: string) => {
    const payload = webTokenService.verify(token);

    if(!payload) {
        throw new HttpException("Authorization failed.", 401);
    }

    return payload;
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = getAuthHeader(req);
    const token = getTokenFromHeader(authHeader);
    const payload = getPayloadFromToken(token) as AuthPayload;

    req.userId = payload.userId;

    next();
};