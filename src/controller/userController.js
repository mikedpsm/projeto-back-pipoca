import express from "express";
import { prisma } from "../db.js";
import schemaUser from "../validation/schemaUser.js";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
  try {
    const { username, email, dataNascimento, password } = req.body;

    await schemaUser.validate({
      username,
      email,
      dataNascimento,
      password,
    });

    const formattedDataNascimento = new Date(dataNascimento).toISOString();

    const newUser = await prisma.assinante.create({
      data: {
        nome: username,
        email,
        data_de_nascimento: formattedDataNascimento,
        password,
      },
    });

    res.status(201).send(newUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send({ error: error.errors.join(", ") });
    } else {
      console.error("Error creating user:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
});

export { usersRouter };
