"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../src/app"));
var database_1 = require("../src/database/database");
var testFactory_1 = require("../src/factories/testFactory");
var userFactory_1 = require("../src/factories/userFactory");
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.prisma.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE tests"], ["TRUNCATE TABLE tests"])))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
console.log("o teste est\u00E1 rodando em ".concat(process.env.DATABASE_URL));
describe("Test route POST /tests", function () {
    var newUser = (0, userFactory_1.createNewUser)();
    var newTest = (0, testFactory_1.createNewTest)();
    it("Create new test and return status 201", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result, createdTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/tests').send(__assign(__assign({}, newTest), { categorieId: 1, disciplineId: 6, teacherId: 2 })).set('Authorization', 'Bearer ' + signin.text)];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, database_1.prisma.tests.findFirst({ where: { name: newTest.name } })];
                case 4:
                    createdTest = _a.sent();
                    expect(result.status).toBe(201);
                    expect(createdTest).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Trying to create new test without token authozition, return status 401", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result, createdTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/tests').send(__assign(__assign({}, newTest), { categorieId: 1, disciplineId: 6, teacherId: 2 }))];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, database_1.prisma.tests.findFirst({ where: { name: newTest.name } })];
                case 4:
                    createdTest = _a.sent();
                    expect(result.status).toBe(401);
                    expect(createdTest).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Trying to create new test with invalid token, return status 401", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result, createdTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/tests').send(__assign(__assign({}, newTest), { categorieId: 1, disciplineId: 6, teacherId: 2 })).set('Authorization', 'Bearer ' + "invalidtoken")];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, database_1.prisma.tests.findFirst({ where: { name: newTest.name } })];
                case 4:
                    createdTest = _a.sent();
                    expect(result.status).toBe(401);
                    expect(createdTest).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Trying to create new test with with empty body, return status 422", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/tests').send({}).set('Authorization', 'Bearer ' + signin.text)];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Trying to create new test with not registered discipline, return status 404", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result, createdTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/tests').send(__assign(__assign({}, newTest), { categorieId: 1, disciplineId: 8, teacherId: 2 })).set('Authorization', 'Bearer ' + signin.text)];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, database_1.prisma.tests.findFirst({ where: { name: newTest.name } })];
                case 4:
                    createdTest = _a.sent();
                    expect(result.status).toBe(404);
                    expect(createdTest).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Trying to create new test with not registered categorie, return status 404", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result, createdTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/tests').send(__assign(__assign({}, newTest), { categorieId: 8, disciplineId: 6, teacherId: 2 })).set('Authorization', 'Bearer ' + signin.text)];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, database_1.prisma.tests.findFirst({ where: { name: newTest.name } })];
                case 4:
                    createdTest = _a.sent();
                    expect(result.status).toBe(404);
                    expect(createdTest).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Trying to create new test with not registered teacher, return status 404", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result, createdTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/tests').send(__assign(__assign({}, newTest), { categorieId: 1, disciplineId: 6, teacherId: 6 })).set('Authorization', 'Bearer ' + signin.text)];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, database_1.prisma.tests.findFirst({ where: { name: newTest.name } })];
                case 4:
                    createdTest = _a.sent();
                    expect(result.status).toBe(404);
                    expect(createdTest).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Trying to create new test with unavaliable teacherDeiscipline relation, return status 404", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result, createdTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/tests').send(__assign(__assign({}, newTest), { categorieId: 1, disciplineId: 6, teacherId: 6 })).set('Authorization', 'Bearer ' + signin.text)];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, database_1.prisma.tests.findFirst({ where: { name: newTest.name } })];
                case 4:
                    createdTest = _a.sent();
                    expect(result.status).toBe(404);
                    expect(createdTest).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test route GET /tests/disciplines', function () {
    var newUser = (0, userFactory_1.createNewUser)();
    var newTest = (0, testFactory_1.createNewTest)();
    it("Get all tests grouping by terms and teachers, return status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).get('/tests/disciplines').send().set('Authorization', 'Bearer ' + signin.text)];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(200);
                    expect(result.body).toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Get all tests grouping by terms and teachers without autorization token return status 401", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).get('/tests/disciplines').send()];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Get all tests grouping by terms and teachers with invalid token return status 401", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).get('/tests/disciplines').send().set('Authorization', 'Bearer ' + 'Invalid token')];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test route GET /tests/teachers', function () {
    var newUser = (0, userFactory_1.createNewUser)();
    var newTest = (0, testFactory_1.createNewTest)();
    it("Get all tests grouping by terms and teachers, return status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).get('/tests/teachers').send().set('Authorization', 'Bearer ' + signin.text)];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(200);
                    expect(result.body).toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Get all tests grouping by terms and teachers without autorization token return status 401", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).get('/tests/teachers').send()];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Get all tests grouping by terms and teachers with invalid token return status 401", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signin, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-up').send(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).post('/sign-in').send({ email: newUser.email, password: "1234" })];
                case 2:
                    signin = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(app_1["default"]).get('/tests/teachers').send().set('Authorization', 'Bearer ' + 'Invalid token')];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1;
