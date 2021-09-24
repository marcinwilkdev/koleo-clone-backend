import express from "express";
import mongoose from "mongoose";

import helmet from "helmet";
import compression from "compression";

import { errorsHandler } from "./middlewares/errors";
import { setCORSHeaders } from "./middlewares/headers";

import authRoutes from "./routes/auth";
import ticketsRoutes from "./routes/tickets";
import citiesRoutes from "./routes/cities";
import connectionsRoutes from "./routes/connections";

import EncryptionService from "./services/other/EncryptionService";
import WebTokenService from "./services/other/WebTokenService";

import BcryptjsEncryptionService from "./services/other/implementations/BcryptjsEncryptionService";
import JsonWebTokenService from "./services/other/implementations/JsonWebTokenService";

import CityService from "./services/database/CityService";
import MongooseCityService from "./services/database/implementations/MongooseCityService";
import TicketService from "./services/database/TicketService";
import MongooseTicketService from "./services/database/implementations/MongooseTicketService";
import UserService from "./services/database/UserService";
import MongooseUserService from "./services/database/implementations/MongooseUserService";
import ConnectionService from "./services/database/ConnectionService";
import MongooseConnectionService from "./services/database/implementations/MongooseConnectionService";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const jwtSecret = process.env.JWT_SECRET || "somesupersecret";

EncryptionService.init(new BcryptjsEncryptionService());
WebTokenService.init(new JsonWebTokenService(jwtSecret));

CityService.init(new MongooseCityService());
TicketService.init(new MongooseTicketService());
UserService.init(new MongooseUserService());
ConnectionService.init(new MongooseConnectionService());

const app = express();

app.use(helmet());
app.use(compression());

app.use(setCORSHeaders);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/cities", citiesRoutes);
app.use("/connections", connectionsRoutes);

app.use(errorsHandler);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hew9q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() =>
        app.listen(process.env.PORT || 8080, () =>
            console.log("SERVER STARTED")
        )
    )
    .catch((err) => console.log(err));
