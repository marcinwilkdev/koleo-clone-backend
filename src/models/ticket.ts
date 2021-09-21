import { Document, model, Schema } from "mongoose";

export interface ITicket extends Document {
    date: Date;
    departureCity: string;
    arrivalCity: string;
    ticketType: string;
    trainType: string;
    price: number;
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
});

export default model<ITicket>("Ticket", ticketSchema);
