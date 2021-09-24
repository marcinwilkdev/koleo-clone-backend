"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TicketService = /** @class */ (function () {
    function TicketService() {
    }
    TicketService.init = function (instance) {
        this.instance = instance;
    };
    TicketService.getInstance = function () {
        return this.instance;
    };
    return TicketService;
}());
exports.default = TicketService;
