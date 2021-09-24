"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsHandler = void 0;
var errorsHandler = function (err, req, res, next) {
    var statusCode = err.statusCode;
    var responseBody = {
        errorMessage: err.message,
    };
    res.status(statusCode).json(responseBody);
};
exports.errorsHandler = errorsHandler;
