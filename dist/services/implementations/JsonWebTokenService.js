"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JsonWebTokenService = /** @class */ (function () {
    function JsonWebTokenService(secret) {
        this.secret = secret;
    }
    JsonWebTokenService.prototype.sign = function (payload, expiresInHours) {
        return jsonwebtoken_1.default.sign(payload, this.secret, {
            expiresIn: expiresInHours + "h",
        });
    };
    JsonWebTokenService.prototype.verify = function (token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    };
    return JsonWebTokenService;
}());
exports.default = JsonWebTokenService;
