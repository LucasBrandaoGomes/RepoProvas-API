import joi from "joi";
import { TestBodyData } from "../types/testTypes";
import { UserBodyData } from "../types/userTypes";

const signUpSchema = joi.object<UserBodyData>({
  email: joi.string().email().required(),
  password: joi
  .string()
  .required(),
  passwordConfirmation: joi.any().valid(joi.ref('password')).required()
});

const signInSchema = joi.object<UserBodyData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const testSchema = joi.object<TestBodyData>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categorieId: joi.number().required(),
  disciplineId: joi.number().required(),
  teacherId: joi.number().required()
})

export { signUpSchema, signInSchema, testSchema };