import { NextFunction, Request, Response } from "express";
import WebTokenService from "../services/other/WebTokenService";
import { AuthPayload } from "./is-auth";

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");

    if(!authHeader) {
        next();
        return;
    }

    const token = authHeader.split(" ")[1];

    if(!token) {
        next();
        return;
    }

    const payload = WebTokenService.getInstance().verify(token) as AuthPayload;

    if(!payload || !payload.userId) {
        next();
        return;
    }

    req.userId = payload.userId;

    next();
};