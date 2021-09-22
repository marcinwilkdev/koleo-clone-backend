import { Document, model, Schema } from "mongoose";

export interface ITicket {
    date: Date;
    departureCity: string;
    arrivalCity: string;
    ticketType: string;
    trainType: string;
    price: number;
    ownerId: string;
}

export interface ISavedTicket extends ITicket {
    id: string;
}

export interface ITicketDocument extends Document, ITicket {}

const ticketSchema = new Schema<ITicketDocument>({
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
        type: String,
        required: true,
        ref: "User", // ???
    },
});

export default model<ITicketDocument>("Ticket", ticketSchema);
