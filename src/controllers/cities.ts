import { NextFunction, Request, Response } from "express";
import { cityService } from "../app";
import { ICity } from "../models/city";

import { handleErrors } from "../util/helpers";

interface City {
    id: string;
    name: string;
}
interface GetCitiesResponseBody {
    message: string;
    cities: City[];
}

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

interface AddCityRequestBody {
    name: string;
}

interface AddCityResponseBody {
    message: string;
}

export const addCity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const body = req.body as AddCityRequestBody;

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
