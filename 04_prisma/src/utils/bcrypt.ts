import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/env.config";

export async function hashPassword(password: string): Promise<string> {
  if (!password) {
    throw new Error("password required !!!");
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  text: string,
  hashed: string
): Promise<boolean> {
  return await bcrypt.compare(text, hashed);
}
