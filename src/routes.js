import { prisma } from "./db.js";

const db = prisma;

export const registerRoutes = (app) => {
  app.post("/register", async (request, reply) => {
    // TODO
  });
};
