import { NextFunction, Request, Response } from "express";

import CityService from "../services/database/CityService";

import { handleErrors } from "../util/helpers";

import { ICity } from "../models/city";

import { AddCityResponseBody, GetCitiesResponseBody } from "./types/cities";

export const getCities = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cities = await CityService.getInstance().findAll();

        const responseBody: GetCitiesResponseBody = {
            message: "Cities fetched succesfully.",
            cities,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
        return;
    }
};

export const addCity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const city = req.body as ICity;

    try {
        await CityService.getInstance().save(city);

        const responseBody: AddCityResponseBody = {
            message: "City added succesfully.",
        };

        res.status(201).json(responseBody);
    } catch (err) {
        handleErrors(err, next);
        return;
    }
};
