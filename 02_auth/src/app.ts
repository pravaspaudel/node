import express from "express";
import { PORT } from "./config/env.config";
import connectDB from "./db/db.config";
import { MONGO_URL } from "./config/env.config";
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoute";
import pageRoutes from "./routes/homeRoute";

const app = express();

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/", pageRoutes);

app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(MONGO_URL);
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`);
        });
    } catch (er) {
        console.log("error", er);
    }
};

start();
