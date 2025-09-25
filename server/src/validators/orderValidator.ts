import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        title: z.string().min(3),
        location: z.object({
            lat: z.number().min(-90).max(90),    // latitude range
            lng: z.number().min(-180).max(180),  // longitude range
        }),
    }),
});

export const assignOrderSchema = z.object({
    body: z.object({
        orderId: z.string().min(1, "Order ID is required"),
        partnerId: z.string().min(1, "Partner ID is required"),
    }),
});

export const updateStatusSchema = z.object({
    body: z.object({
        status: z.enum(["pending", "in-progress", "delivered", "cancelled"]),
    }),
    params: z.object({
        orderId: z.string().min(1, "Order ID is required"),
    }),
});
