"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleAvailabilitySchema = void 0;
const zod_1 = require("zod");
exports.toggleAvailabilitySchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, "User ID is required"),
        available: zod_1.z.boolean(),
    }),
});
