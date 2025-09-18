import express, { Express } from "express";
import { PORT } from "./config/env.config";
import { MONGO_URL } from "./config/env.config";
import { connectDb } from "./config/db.config";
import bookRoutes from "./routers/bookRoute";

const app: Express = express();

app.use(express.json());

app.use("/api", bookRoutes);

const start = async () => {
    try {
        await connectDb(MONGO_URL);

        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log("error in connecting to db");
    }
};

start();
