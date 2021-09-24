"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionService = /** @class */ (function () {
    function ConnectionService() {
    }
    ConnectionService.init = function (instance) {
        this.instance = instance;
    };
    ConnectionService.getInstance = function () {
        return this.instance;
    };
    return ConnectionService;
}());
exports.default = ConnectionService;
