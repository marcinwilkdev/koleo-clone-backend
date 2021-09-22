import { Document, model, Schema } from "mongoose";

import City, { ICity } from "./city";

interface IConnection {
    cities: {
        city: ICity;
        date: Date;
    }[];
    trainType: string;
}

interface IConnectionDocument extends Document, IConnection {}

const connectionSchema = new Schema<IConnectionDocument>({
    cities: [
        {
            city: {
                type: City,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
        },
    ],
    trainType: {
        type: String,
        required: true,
    },
});

export default model<IConnectionDocument>("Connection", connectionSchema);
