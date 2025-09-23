import express from "express";
import { PORT } from "./config/env.config";
import errorHandler from "./middlewares/errorHandlers";
import userRouter from "./routes/user.router";
import eventRouter from "./routes/events.router";

const app = express();

app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api", eventRouter);

//error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
