import { Document, model, Schema } from "mongoose";

import { ISavedCity } from "./city";

export interface IConnection {
    cities: {
        city: ISavedCity;
        date: Date;
        price: number;
    }[];
    trainType: string;
}

export interface ISavedConnection extends IConnection {
    id: string;
}

export interface IConnectionDocument extends Document, IConnection {}

const connectionSchema = new Schema<IConnectionDocument>({
    cities: [
        {
            city: {
                type: {
                    id: {
                        type: String,
                        required: true,
                    },
                    name: {
                        type: String,
                        required: true,
                    },
                },
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            price: {
                type: Number,
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
