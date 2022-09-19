"use strict";
exports.__esModule = true;
exports.validateSchemaMiddleware = void 0;
function validateSchemaMiddleware(schema) {
    return function (req, res, next) {
        var body = req.body;
        var error = schema.validate(body, { abortEarly: false }).error;
        if (error) {
            throw { code: "Invalid", message: error.details.map(function (e) { return e.message; }) };
        }
        res.locals.body = req.body;
        next();
    };
}
exports.validateSchemaMiddleware = validateSchemaMiddleware;
