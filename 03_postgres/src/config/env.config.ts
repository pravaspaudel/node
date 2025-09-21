import dotenv from "dotenv";

dotenv.config({ quiet: true });

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const PORT: number = Number(getEnvVar("PORT"));
export const DB_NAME: string = getEnvVar("DB_NAME");
export const DB_USER: string = getEnvVar("DB_USER");
export const DB_PASSWORD: string = getEnvVar("DB_PASSWORD");
export const DB_HOST: string = getEnvVar("DB_HOST");
export const DB_PORT: number = Number(getEnvVar("DB_PORT"));
