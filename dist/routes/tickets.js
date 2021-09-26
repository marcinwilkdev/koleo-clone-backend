"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var tickets_1 = require("../controllers/tickets");
var is_auth_1 = require("../middlewares/is-auth");
var router = (0, express_1.Router)();
router.put("/create", is_auth_1.isAuth, [
    (0, express_validator_1.body)("arrivalCity").trim().notEmpty(),
    (0, express_validator_1.body)("departureCity").trim().notEmpty(),
    (0, express_validator_1.body)("id").trim().notEmpty(),
], tickets_1.createTicket);
router.get("/list", is_auth_1.isAuth, tickets_1.getTickets);
router.get("/count", is_auth_1.isAuth, tickets_1.getTicketsCount);
exports.default = router;
