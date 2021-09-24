"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebTokenService = void 0;
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
exports.WebTokenService = WebTokenService;
