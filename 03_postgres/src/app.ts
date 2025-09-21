import express from "express";
import userRouter from "./routes/allRoutes";
import { pool } from "./config/postgres";
import errorHandler from "./middlewares/errorHandler";
import { createTable } from "./models/createTable";
import { DB_PASSWORD } from "./config/env.config";

const app = express();

app.use(express.json());

app.use("/", userRouter);

app.use(errorHandler);
const PORT = 5000;

const start = async () => {
  try {
    console.log(DB_PASSWORD);
    await pool.connect();
    console.log("successfully connected to db");

    createTable();

    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}`);
    });
  } catch (err) {
    console.log("Error :", err);
  }
};

start();
