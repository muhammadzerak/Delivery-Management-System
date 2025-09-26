"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusSchema = exports.assignOrderSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3),
        location: zod_1.z.object({
            lat: zod_1.z.number().min(-90).max(90), // latitude range
            lng: zod_1.z.number().min(-180).max(180), // longitude range
        }),
    }),
});
exports.assignOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderId: zod_1.z.string().min(1, "Order ID is required"),
        partnerId: zod_1.z.string().min(1, "Partner ID is required"),
    }),
});
exports.updateStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["pending", "in-progress", "delivered", "cancelled"]),
    }),
    params: zod_1.z.object({
        orderId: zod_1.z.string().min(1, "Order ID is required"),
    }),
});
