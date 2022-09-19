"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = __importDefault(require("./app"));
dotenv_1["default"].config();
var PORT = Number(process.env.PORT || 5000);
console.log("est\u00E1 rodando ".concat(process.env.DATABASE_URL));
app_1["default"].listen(PORT, function () { console.log("Server runing on port ".concat(PORT)); });
