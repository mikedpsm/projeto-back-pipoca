import fastifyCors from "@fastify/cors";
import fastifyBcrypt from "fastify-bcrypt";
import { registerRoutes } from "./routes.js";

export const start = async (app) => {
  app.register(fastifyCors);
  app.register(fastifyBcrypt);

  registerRoutes(app);

  app.log.level = "debug";

  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
