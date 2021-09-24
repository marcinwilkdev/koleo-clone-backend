"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.ticketService = exports.cityService = exports.webTokenService = exports.encryptionService = void 0;
var MongooseCityService_1 = __importDefault(require("./database/implementations/MongooseCityService"));
var MongooseTicketService_1 = __importDefault(require("./database/implementations/MongooseTicketService"));
var MongooseUserService_1 = __importDefault(require("./database/implementations/MongooseUserService"));
var BcryptjsEncryptionService_1 = __importDefault(require("./other/implementations/BcryptjsEncryptionService"));
var JsonWebTokenService_1 = __importDefault(require("./other/implementations/JsonWebTokenService"));
exports.encryptionService = new BcryptjsEncryptionService_1.default();
exports.webTokenService = new JsonWebTokenService_1.default(process.env.JWT_SECRET || "somesupersecret");
exports.cityService = new MongooseCityService_1.default();
exports.ticketService = new MongooseTicketService_1.default();
exports.userService = new MongooseUserService_1.default();
