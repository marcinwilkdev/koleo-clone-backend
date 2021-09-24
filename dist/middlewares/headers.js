"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCORSHeaders = void 0;
var setCORSHeaders = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
};
exports.setCORSHeaders = setCORSHeaders;
