"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebTokenService = /** @class */ (function () {
    function WebTokenService() {
    }
    WebTokenService.init = function (instance) {
        this.instance = instance;
    };
    WebTokenService.getInstance = function () {
        return this.instance;
    };
    return WebTokenService;
}());
exports.default = WebTokenService;
