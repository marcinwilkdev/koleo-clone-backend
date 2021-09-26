"use strict";
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
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var UserService_1 = __importDefault(require("../services/database/UserService"));
var auth_1 = require("../controllers/auth");
var is_auth_1 = require("../middlewares/is-auth");
var router = (0, express_1.Router)();
router.put("/signup", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .custom(function (value, _a) {
        var req = _a.req;
        return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, UserService_1.default.getInstance().findByEmail(value)];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            throw Error("User with this e-mail address already exists.");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)("password").trim().isLength({ min: 8 }),
    (0, express_validator_1.body)("confirmPassword")
        .trim()
        .custom(function (value, _a) {
        var req = _a.req;
        if (value !== req.body.password) {
            throw new Error("Passwords don't match.");
        }
        return true;
    }),
], auth_1.signup);
router.post("/signin", auth_1.signin);
router.put("/set-data", is_auth_1.isAuth, [
    (0, express_validator_1.body)("discount").trim().custom(function (value, _a) {
        var req = _a.req;
        if (value !== "true" && value !== "false") {
            return false;
        }
        return true;
    }),
    (0, express_validator_1.body)("firstName").trim().notEmpty(),
    (0, express_validator_1.body)("lastName").trim().notEmpty(),
    (0, express_validator_1.body)("dateOfBirth").isDate(),
], auth_1.setData);
router.get("/get-data", is_auth_1.isAuth, auth_1.getData);
exports.default = router;
