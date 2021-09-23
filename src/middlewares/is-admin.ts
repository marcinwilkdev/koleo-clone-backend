import { NextFunction, Request, Response } from "express";
import UserService from "../services/database/UserService";
import { handleErrors } from "../util/helpers";
import HttpException from "../util/HttpException";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;

    try {
        const user = await UserService.getInstance().findById(userId);

        if(!user) {
            throw new HttpException("User not found.", 404);
        }

        if(!user.isAdmin) {
            throw new HttpException("User is not an admin.", 403);
        }
    } catch(err) {
        handleErrors(err, next);
        return;
    }

    next();
};