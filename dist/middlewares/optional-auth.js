"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = void 0;
var WebTokenService_1 = __importDefault(require("../services/other/WebTokenService"));
var optionalAuth = function (req, res, next) {
    var authHeader = req.get("Authorization");
    if (!authHeader) {
        next();
        return;
    }
    var token = authHeader.split(" ")[1];
    if (!token) {
        next();
        return;
    }
    var payload = WebTokenService_1.default.getInstance().verify(token);
    if (!payload || !payload.userId) {
        next();
        return;
    }
    req.userId = payload.userId;
    next();
};
exports.optionalAuth = optionalAuth;
