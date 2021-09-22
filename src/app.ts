import express from "express";
import mongoose from "mongoose";
import { errorsHandler } from "./middlewares/errors";
import { setCORSHeaders } from "./middlewares/headers";

import authRoutes from "./routes/auth";
import ticketsRoutes from "./routes/tickets";
import citiesRoutes from "./routes/cities";
import EncryptionService from "./services/EncryptionService";
import BcryptjsEncryptionService from "./services/implementations/BcryptjsEncryptionService";
import WebTokenService from "./services/WebTokenService";
import JsonWebTokenService from "./services/implementations/JsonWebTokenService";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

export const encryptionService: EncryptionService =
    new BcryptjsEncryptionService();
export const webTokenService: WebTokenService = new JsonWebTokenService(
    process.env.JWT_SECRET || "somesupersecret"
);

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
