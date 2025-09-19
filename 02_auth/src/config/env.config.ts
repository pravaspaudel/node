import dotenv from "dotenv";

dotenv.config({ quiet: true });

const PORT: Number = Number(process.env.PORT) || 4000;
const MONGO_URL: string | undefined = process.env.MONGO_URL;
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

export { PORT, MONGO_URL, JWT_SECRET };
