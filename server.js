import express from "express";
import cors from "cors";
import { router } from "./src/router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

console.log(process.env.DATABASE_URL);

app.listen(process.env.PORT || 3000);
