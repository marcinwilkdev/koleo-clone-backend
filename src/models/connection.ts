import { Document, model, Schema } from "mongoose";
import { ICity } from "./city";

import City from "./city";

interface IConnection extends Document {
    departureCity: ICity;
    through: ICity[];
    arrivalCity: ICity;
    departureDate: Date;
    arrivalDate: Date;
    trainType: string;
    price: number;
}

const connectionSchema = new Schema<IConnection>({
    departureCity: {
        type: City,
        required: true,
    },
    through: [
        {
            type: City,
            required: true,
        },
    ],
    arrivalCity: {
        type: City,
        required: true,
    },
    departureDate: {
        type: Date,
        required: true,
    },
    arrivalDate: {
        type: Date,
        required: true,
    },
    trainType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

export default model<IConnection>("Connection", connectionSchema);
