import express from "express";
import * as user from "./controller/userController.js";

const router = express();

router.post("/cadastrar", user.registerUser);
router.post("/login", user.login);

router.get("/usuarios", user.getAllUsers);

router.delete("/usuarios/:id", user.deleteUser);

export { router };
