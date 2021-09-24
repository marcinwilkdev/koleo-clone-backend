"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketsCount = exports.getTickets = exports.createTicket = void 0;
var TicketService_1 = __importDefault(require("../services/database/TicketService"));
var helpers_1 = require("../util/helpers");
var HttpException_1 = __importDefault(require("../util/HttpException"));
var ConnectionService_1 = __importDefault(require("../services/database/ConnectionService"));
var connections_1 = require("./connections");
var TICKETS_PER_PAGE = 10;
var sortTicketsByDate = function (tickets) {
    tickets.sort(function (first, second) {
        var firstDateInMilliseconds = first.date.getTime();
        var secondDateInMilliseconds = second.date.getTime();
        return firstDateInMilliseconds - secondDateInMilliseconds;
    });
};
var trimConnection = function (connection, departureCity, arrivalCity) {
    var cities = connection.cities;
    var arrivalCityIndex = cities.findIndex(function (city) { return city.city.name === arrivalCity; });
    var departureCityIndex = cities.findIndex(function (city) { return city.city.name === departureCity; });
    if (arrivalCityIndex < 0 || departureCityIndex < 0) {
        throw new HttpException_1.default("City not found.", 404);
    }
    var preparedCities = cities.slice(departureCityIndex, arrivalCityIndex + 1);
    var preparedConnection = __assign(__assign({}, connection), { cities: preparedCities });
    return preparedConnection;
};
var createTicket = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, ownerId, connection, date, trainType, departureCity, arrivalCity, preparedConnection, discount, price, ticket, responseBody, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                ownerId = req.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, ConnectionService_1.default.getInstance().findById(body.id)];
            case 2:
                connection = _a.sent();
                if (!connection) {
                    throw new HttpException_1.default("Connection not found.", 404);
                }
                date = new Date();
                trainType = connection.trainType;
                departureCity = body.departureCity;
                arrivalCity = body.arrivalCity;
                preparedConnection = trimConnection(connection, departureCity, arrivalCity);
                return [4 /*yield*/, helpers_1.getUserDiscount(req)];
            case 3:
                discount = _a.sent();
                price = connections_1.getConnectionPrice(preparedConnection, discount);
                ticket = {
                    date: date,
                    arrivalCity: arrivalCity,
                    departureCity: departureCity,
                    price: price,
                    ticketType: "jednorazowy",
                    trainType: trainType,
                    ownerId: ownerId,
                };
                return [4 /*yield*/, TicketService_1.default.getInstance().save(ticket)];
            case 4:
                _a.sent();
                responseBody = {
                    message: "Ticket created succesfully.",
                };
                res.status(201).json(responseBody);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                helpers_1.handleErrors(err_1, next);
                return [2 /*return*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createTicket = createTicket;
var getTickets = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pageNumber, ownerId, tickets, responseBody, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pageNumber = +(req.query.page || 1);
                ownerId = req.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, TicketService_1.default.getInstance().findAllByOwnerIdPaged(ownerId, TICKETS_PER_PAGE, pageNumber)];
            case 2:
                tickets = _a.sent();
                sortTicketsByDate(tickets);
                responseBody = {
                    message: "Tickets fetched successfully.",
                    tickets: tickets,
                };
                res.status(200).json(responseBody);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                helpers_1.handleErrors(err_2, next);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTickets = getTickets;
var getTicketsCount = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ownerId, ticketsCount, responseBody, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ownerId = req.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, TicketService_1.default.getInstance().countAllByOwnerId(ownerId)];
            case 2:
                ticketsCount = _a.sent();
                responseBody = {
                    message: "Tickets count fetched successfully.",
                    ticketsCount: ticketsCount,
                };
                res.status(200).json(responseBody);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                helpers_1.handleErrors(err_3, next);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTicketsCount = getTicketsCount;
