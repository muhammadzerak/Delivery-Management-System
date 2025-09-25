import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        username: z.string().min(3, "Username must be at least 3 characters"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        role: z.enum(["admin", "partner", "user"]),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        username: z.string().min(2),
        password: z.string().min(5),
    }),
});
