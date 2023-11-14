import fastify from "fastify";
import { start } from "./src/app.js";

const app = fastify({ logger: true });
start(app);
