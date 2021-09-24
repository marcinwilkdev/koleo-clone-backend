"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
var WebTokenService_1 = __importDefault(require("../services/other/WebTokenService"));
var helpers_1 = require("../util/helpers");
var HttpException_1 = __importDefault(require("../util/HttpException"));
var getAuthHeader = function (req) {
    var authHeader = req.get("Authorization");
    if (!authHeader) {
        throw new HttpException_1.default("Authorization failed.", 401);
    }
    return authHeader;
};
var getTokenFromHeader = function (authHeader) {
    var token = authHeader.split(" ")[1];
    if (!token) {
        throw new HttpException_1.default("Authorization failed.", 401);
    }
    return token;
};
var getPayloadFromToken = function (token) {
    var payload = WebTokenService_1.default.getInstance().verify(token);
    if (!payload) {
        throw new HttpException_1.default("Authorization failed.", 401);
    }
    return payload;
};
var isAuth = function (req, res, next) {
    try {
        var authHeader = getAuthHeader(req);
        var token = getTokenFromHeader(authHeader);
        var payload = getPayloadFromToken(token);
        req.userId = payload.userId;
    }
    catch (err) {
        helpers_1.handleErrors(err, next);
        return;
    }
    next();
};
exports.isAuth = isAuth;
