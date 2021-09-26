"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ticketSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("Ticket", ticketSchema);
