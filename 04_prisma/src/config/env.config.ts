import dotenv from "dotenv";

dotenv.config({ quiet: true });

const PORT = Number(process.env.PORT);
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("jwt secret isnot defined");
}

if (!PORT || !SALT_ROUNDS) {
  throw new Error("something is not defined");
}

export { PORT, SALT_ROUNDS, JWT_SECRET };
