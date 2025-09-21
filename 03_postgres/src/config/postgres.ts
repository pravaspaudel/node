import { Pool } from "pg";
import { DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, DB_HOST } from "./env.config";

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});
