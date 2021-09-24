"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CityService = /** @class */ (function () {
    function CityService() {
    }
    CityService.init = function (instance) {
        this.instance = instance;
    };
    CityService.getInstance = function () {
        return this.instance;
    };
    return CityService;
}());
exports.default = CityService;
