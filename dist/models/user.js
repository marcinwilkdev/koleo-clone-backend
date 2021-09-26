"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    discount: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    isAdmin: Boolean,
});
exports.default = (0, mongoose_1.model)("User", userSchema);
