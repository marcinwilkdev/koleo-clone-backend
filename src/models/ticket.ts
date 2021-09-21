import { Document, model, Schema, Types } from "mongoose";

export interface ITicket extends Document {
    date: Date;
    departureCity: string;
    arrivalCity: string;
    ticketType: string;
    trainType: string;
    price: number;
    ownerId: Types.ObjectId;
}

const ticketSchema = new Schema<ITicket>({
    date: {
        type: Date,
        required: true,
    },
    departureCity: {
        type: String,
        required: true,
    },
    arrivalCity: {
        type: String,
        required: true,
    },
    ticketType: {
        type: String,
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
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

export default model<ITicket>("Ticket", ticketSchema);
