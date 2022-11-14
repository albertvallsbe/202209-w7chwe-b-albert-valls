import express from "express";
import cors from "cors";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errors/errors.js";
import usersRouter from "./routers/usersRouter/usersRouter.js";

const app = express();
app.use(cors());

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
