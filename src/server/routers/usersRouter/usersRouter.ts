import express from "express";
import { validate } from "express-validation";
import {
  registerUser,
  loginUser,
} from "../../controllers/usersControllers/usersControllers.js";
import userRegisterSchema from "../../../schemes/userSchema.js";

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post("/login", loginUser);
usersRouter.post(
  "/register",
  validate(userRegisterSchema, {}, { abortEarly: false }),
  registerUser
);

export default usersRouter;
