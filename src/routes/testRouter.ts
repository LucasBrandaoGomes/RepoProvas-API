import { Router } from "express";

import * as schemas from "../schemas/schemas";
import * as controller from "../controllers/testController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { checkAuthentication } from "../middlewares/tokenValidationMiddleware";

const testRouter = Router()

testRouter.post('/tests', checkAuthentication, validateSchemaMiddleware(schemas.testSchema), controller.createNewTest)

testRouter.get('/tests/disciplines', checkAuthentication, controller.getTestsByDiscipline )
testRouter.get('/tests/teachers', checkAuthentication, controller.getTestsByTeacher )

export default testRouter