"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.testSchema = exports.signInSchema = exports.signUpSchema = void 0;
var joi_1 = __importDefault(require("joi"));
var signUpSchema = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"]
        .string()
        .required(),
    passwordConfirmation: joi_1["default"].any().valid(joi_1["default"].ref('password')).required()
});
exports.signUpSchema = signUpSchema;
var signInSchema = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().required()
});
exports.signInSchema = signInSchema;
var testSchema = joi_1["default"].object({
    name: joi_1["default"].string().required(),
    pdfUrl: joi_1["default"].string().uri().required(),
    categorieId: joi_1["default"].number().required(),
    disciplineId: joi_1["default"].number().required(),
    teacherId: joi_1["default"].number().required()
});
exports.testSchema = testSchema;
