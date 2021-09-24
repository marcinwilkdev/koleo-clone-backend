"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EncryptionService = /** @class */ (function () {
    function EncryptionService() {
    }
    EncryptionService.init = function (instance) {
        this.instance = instance;
    };
    EncryptionService.getInstance = function () {
        return this.instance;
    };
    return EncryptionService;
}());
exports.default = EncryptionService;
