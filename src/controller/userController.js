import schemaUser from "../validation/schemaUser.js";
import { prisma } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.assinante.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        data_de_nascimento: true,
      },
    });

    res.status(200).send(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, dataNascimento, password } = req.body;

    await schemaUser.validate({
      username,
      email,
      dataNascimento,
      password,
    });

    const emailExists = await checkIfEmailAlreadyExists(email);
    if (emailExists) {
      return res.status(400).send({ error: "Este email já está em uso!" });
    }

    const formattedDataNascimento = fixDateFormat(dataNascimento);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.assinante.create({
      data: {
        nome: username,
        email,
        data_de_nascimento: formattedDataNascimento,
        password: hashedPassword,
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
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.assinante.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).send({ error: "Usuário não encontrado!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ error: "Senha incorreta!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ token });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).send({ error: "Erro interno de servidor." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.assinante.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).send({ error: "Usuário não encontrado!" });
    }

    await prisma.assinante.delete({
      where: {
        id,
      },
    });

    res.status(204).send({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).send({ error: "Erro interno de servidor." });
  }
};

function fixDateFormat(date) {
  return new Date(date).toISOString();
}

async function checkIfEmailAlreadyExists(email) {
  return prisma.assinante.findUnique({
    where: {
      email,
    },
  });
}
