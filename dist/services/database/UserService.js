"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.init = function (instance) {
        this.instance = instance;
    };
    UserService.getInstance = function () {
        return this.instance;
    };
    return UserService;
}());
exports.default = UserService;
