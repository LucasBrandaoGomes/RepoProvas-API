"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var express_1 = require("express");
var schemas = __importStar(require("../schemas/schemas"));
var controller = __importStar(require("../controllers/testController"));
var validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
var tokenValidationMiddleware_1 = require("../middlewares/tokenValidationMiddleware");
var testRouter = (0, express_1.Router)();
testRouter.post('/tests', tokenValidationMiddleware_1.checkAuthentication, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(schemas.testSchema), controller.createNewTest);
testRouter.get('/tests/disciplines', tokenValidationMiddleware_1.checkAuthentication, controller.getTestsByDiscipline);
testRouter.get('/tests/teachers', tokenValidationMiddleware_1.checkAuthentication, controller.getTestsByTeacher);
exports["default"] = testRouter;
