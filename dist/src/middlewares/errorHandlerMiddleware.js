"use strict";
exports.__esModule = true;
//import HttpException from '../exceptions/HttpException.js';
function errorHandlerMiddleware(error, req, res, next) {
    var code = error.code, message = error.message;
    if (code === 'Invalid') {
        return res.status(422).send(message);
    }
    if (code === "Unauthorized") {
        return res.status(401).send(message);
    }
    if (code === "NotFound") {
        return res.status(404).send(message);
    }
    if (code === "Conflict") {
        return res.status(409).send(message);
    }
    if (code === "Forbidden") {
        return res.status(403).send(message);
    }
    console.log(message);
    return res.status(500).send('Internal server error');
}
exports["default"] = errorHandlerMiddleware;
