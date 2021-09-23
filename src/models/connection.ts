import { Document, model, Schema } from "mongoose";

import { ISavedCity } from "./city";

export interface IConnection {
    cities: {
        city: ISavedCity;
        date: Date;
    }[];
    trainType: string;
    dateString: string;
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
        },
    ],
    trainType: {
        type: String,
        required: true,
    },
    dateString: {
        type: String,
        required: true
    }
});

export default model<IConnectionDocument>("Connection", connectionSchema);
