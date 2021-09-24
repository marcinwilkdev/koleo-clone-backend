"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var BcryptjsEncryptionService = /** @class */ (function () {
    function BcryptjsEncryptionService() {
    }
    BcryptjsEncryptionService.prototype.hash = function (value, key) {
        return bcryptjs_1.default.hash(value, key);
    };
    BcryptjsEncryptionService.prototype.compare = function (value, hashedValue) {
        return bcryptjs_1.default.compare(value, hashedValue);
    };
    return BcryptjsEncryptionService;
}());
exports.default = BcryptjsEncryptionService;
