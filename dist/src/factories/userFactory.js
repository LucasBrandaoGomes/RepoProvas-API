"use strict";
exports.__esModule = true;
exports.createNewUser = void 0;
var faker_1 = require("@faker-js/faker");
function createNewUser() {
    var user = {
        email: faker_1.faker.internet.email(),
        password: "1234",
        passwordConfirmation: "1234"
    };
    return user;
}
exports.createNewUser = createNewUser;
