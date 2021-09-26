"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var connections_1 = require("../controllers/connections");
var is_admin_1 = require("../middlewares/is-admin");
var is_auth_1 = require("../middlewares/is-auth");
var optional_auth_1 = require("../middlewares/optional-auth");
var router = (0, express_1.Router)();
router.put("/add", is_auth_1.isAuth, is_admin_1.isAdmin, [
    (0, express_validator_1.body)("cities").custom(function (value, _a) {
        var req = _a.req;
        if (value.length < 2) {
            return false;
        }
        return true;
    }),
    (0, express_validator_1.body)("trainType").notEmpty(),
], connections_1.addConnection);
router.get("/find", optional_auth_1.optionalAuth, connections_1.findConnections);
exports.default = router;
