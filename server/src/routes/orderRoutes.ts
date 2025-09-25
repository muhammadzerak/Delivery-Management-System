import { Router } from "express";
import { getOrders, createOrder, assignOrder, updateStatus } from "../controllers/orderController";
import { adminOnly, protect } from "../middleware/authMiddleware";
import { validate } from "../middleware/validate";
import { createOrderSchema, assignOrderSchema, updateStatusSchema } from "../validators/orderValidator";

const router = Router();

router.get("/", getOrders);
router.post("/", protect, adminOnly, validate(createOrderSchema), createOrder);
router.post("/assign", protect, adminOnly, validate(assignOrderSchema), assignOrder);
router.patch("/:orderId/status", protect, validate(updateStatusSchema), updateStatus);

export default router;
