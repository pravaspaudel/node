import dotenv from "dotenv";

dotenv.config({ quiet: true });

const PORT = Number(process.env.PORT);
const MONGO_URL = process.env.MONGO_URL ?? "";

if (!PORT || !MONGO_URL) {
    throw new Error("something is missing in dotenv");
}

export { PORT, MONGO_URL };
