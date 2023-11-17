import express from "express";
import { usersRouter } from "./controller/userController.js";

const router = express();

router.use("/cadastrar", usersRouter);

export { router };
