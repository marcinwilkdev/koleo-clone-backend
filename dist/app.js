"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var helmet_1 = __importDefault(require("helmet"));
var compression_1 = __importDefault(require("compression"));
var errors_1 = require("./middlewares/errors");
var headers_1 = require("./middlewares/headers");
var auth_1 = __importDefault(require("./routes/auth"));
var tickets_1 = __importDefault(require("./routes/tickets"));
var cities_1 = __importDefault(require("./routes/cities"));
var connections_1 = __importDefault(require("./routes/connections"));
var EncryptionService_1 = __importDefault(require("./services/other/EncryptionService"));
var WebTokenService_1 = __importDefault(require("./services/other/WebTokenService"));
var BcryptjsEncryptionService_1 = __importDefault(require("./services/other/implementations/BcryptjsEncryptionService"));
var JsonWebTokenService_1 = __importDefault(require("./services/other/implementations/JsonWebTokenService"));
var CityService_1 = __importDefault(require("./services/database/CityService"));
var MongooseCityService_1 = __importDefault(require("./services/database/implementations/MongooseCityService"));
var TicketService_1 = __importDefault(require("./services/database/TicketService"));
var MongooseTicketService_1 = __importDefault(require("./services/database/implementations/MongooseTicketService"));
var UserService_1 = __importDefault(require("./services/database/UserService"));
var MongooseUserService_1 = __importDefault(require("./services/database/implementations/MongooseUserService"));
var ConnectionService_1 = __importDefault(require("./services/database/ConnectionService"));
var MongooseConnectionService_1 = __importDefault(require("./services/database/implementations/MongooseConnectionService"));
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
var jwtSecret = process.env.JWT_SECRET || "somesupersecret";
EncryptionService_1.default.init(new BcryptjsEncryptionService_1.default());
WebTokenService_1.default.init(new JsonWebTokenService_1.default(jwtSecret));
CityService_1.default.init(new MongooseCityService_1.default());
TicketService_1.default.init(new MongooseTicketService_1.default());
UserService_1.default.init(new MongooseUserService_1.default());
ConnectionService_1.default.init(new MongooseConnectionService_1.default());
var app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(headers_1.setCORSHeaders);
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/tickets", tickets_1.default);
app.use("/cities", cities_1.default);
app.use("/connections", connections_1.default);
app.use(errors_1.errorsHandler);
mongoose_1.default
    .connect(process.env.DB_URL)
    .then(function () {
    return app.listen(process.env.PORT || 8080, function () {
        return console.log("SERVER STARTED");
    });
})
    .catch(function (err) { return console.log(err); });
