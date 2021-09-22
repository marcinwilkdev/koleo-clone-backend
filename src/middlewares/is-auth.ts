import { NextFunction, Request, Response } from "express";
import HttpException from "../util/HttpException";

import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthJwtPayload extends JwtPayload {
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

const getJwtPayloadFromToken = (token: string, secret: string) => {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET || "somesupersecret");

    if(!jwtPayload) {
        throw new HttpException("Authorization failed.", 401);
    }

    return jwtPayload as JwtPayload;
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const jwtSecret = process.env.JWT_SECRET || "somesupersecret";

    const authHeader = getAuthHeader(req);
    const token = getTokenFromHeader(authHeader);
    const jwtPayload = getJwtPayloadFromToken(token, jwtSecret) as AuthJwtPayload;

    req.userId = jwtPayload.userId;

    next();
};