import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";

if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = express();


app.use("/auth", authRoutes);


mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hew9q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() =>
        app.listen(8080, () =>
            console.log("SERVER STARTED ON http://localhost:8080")
        )
    )
    .catch((err) => console.log(err));
