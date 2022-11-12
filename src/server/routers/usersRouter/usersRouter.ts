import express from "express";
import { validate } from "express-validation";
import { registerUser } from "../../controllers/usersControllers/usersControllers.js";
import userRegisterSchema from "../../../schemes/userSchema.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validate(userRegisterSchema, {}, { abortEarly: false }),
  registerUser
);

export default usersRouter;
