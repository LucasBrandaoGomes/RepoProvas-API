import joi from "joi";
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


export { signUpSchema, signInSchema };