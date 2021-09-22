import express from "express";
import mongoose from "mongoose";

import { errorsHandler } from "./middlewares/errors";
import { setCORSHeaders } from "./middlewares/headers";

import authRoutes from "./routes/auth";
import ticketsRoutes from "./routes/tickets";
import citiesRoutes from "./routes/cities";

import EncryptionService from "./services/other/EncryptionService";
import { WebTokenService } from "./services/other/WebTokenService";

import BcryptjsEncryptionService from "./services/other/implementations/BcryptjsEncryptionService";
import JsonWebTokenService from "./services/other/implementations/JsonWebTokenService";
import CityService from "./services/database/CityService";
import MongooseCityService from "./services/database/implementations/MongooseCityService";
import TicketService from "./services/database/TicketService";
import MongooseTicketService from "./services/database/implementations/MongooseTicketService";
import UserService from "./services/database/UserService";
import MongooseUserService from "./services/database/implementations/MongooseUserService";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

export const encryptionService: EncryptionService =
    new BcryptjsEncryptionService();

WebTokenService.init(
    new JsonWebTokenService(process.env.JWT_SECRET || "somesupersecret")
);

export const cityService: CityService = new MongooseCityService();
export const ticketService: TicketService = new MongooseTicketService();
export const userService: UserService = new MongooseUserService();

const app = express();

app.use(setCORSHeaders);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/cities", citiesRoutes);

app.use(errorsHandler);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hew9q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() =>
        app.listen(8080, () =>
            console.log("SERVER STARTED ON http://localhost:8080")
        )
    )
    .catch((err) => console.log(err));
