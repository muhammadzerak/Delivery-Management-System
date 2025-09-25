import { z } from "zod";

export const toggleAvailabilitySchema = z.object({
    body: z.object({
        userId: z.string().min(1, "User ID is required"),
        available: z.boolean(),
    }),
});
