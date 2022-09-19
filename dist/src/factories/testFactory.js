"use strict";
exports.__esModule = true;
exports.createNewTest = void 0;
var faker_1 = require("@faker-js/faker");
function createNewTest() {
    var test = {
        name: faker_1.faker.random.alphaNumeric(),
        pdfUrl: faker_1.faker.internet.url(),
        categorieId: faker_1.faker.random.numeric(2),
        disciplineId: faker_1.faker.random.numeric(2),
        teacherId: faker_1.faker.random.numeric(2)
    };
    return test;
}
exports.createNewTest = createNewTest;
