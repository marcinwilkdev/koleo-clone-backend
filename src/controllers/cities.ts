import { NextFunction, Request, Response } from "express";

import { cityService } from "../app";

import { handleErrors } from "../util/helpers";

import { ICity } from "../models/city";

import { AddCityResponseBody, GetCitiesResponseBody } from "./types/cities";

export const getCities = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cities = await cityService.findAll();

        const responseBody: GetCitiesResponseBody = {
            message: "Cities fetched succesfully.",
            cities,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};

export const addCity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const body = req.body as ICity;

    const name = body.name;

    try {
        const city: ICity = {
            name,
        };

        await cityService.save(city);

        const responseBody: AddCityResponseBody = {
            message: "City added succesfully.",
        };

        res.status(201).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
    }
};
