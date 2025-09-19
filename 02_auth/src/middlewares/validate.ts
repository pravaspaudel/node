import { z } from "zod";

export const userSchemaZod = z.object({
    username: z.string().trim().min(1, "username is required"),
    email: z.string().trim().email("Invalid email"),
    password: z
        .string()
        .trim()
        .min(6, "Passoword must be of at least 6 characters"),
    role: z.enum(["user", "admin"]).default("user"),
});

export type UserInput = z.infer<typeof userSchemaZod>;

//validate the coming data using this zod
