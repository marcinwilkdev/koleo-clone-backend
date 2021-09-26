"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var connectionSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("Connection", connectionSchema);
