import { NextFunction, Request, Response } from "express";
import HttpException from "../util/HttpException";

import jwt, { JwtPayload } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");

    if(!authHeader) {
        throw new HttpException("Authorization failed.", 401);
    }

    const token = authHeader.split(" ")[1];

    if(!token) {
        throw new HttpException("Authorization failed.", 401);
    }

    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET || "somesupersecret") as JwtPayload;

    if(!jwtPayload) {
        throw new HttpException("Authorization failed.", 401);
    }

    req.userId = jwtPayload.userId;

    next();
};