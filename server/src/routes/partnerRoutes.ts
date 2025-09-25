import { Router } from "express";
import { getMyOrders, getPartnerOrders, getPartners, toggleAvailability } from "../controllers/partnerController";
import { protect } from "../middleware/authMiddleware";
import { validate } from "../middleware/validate";
import { toggleAvailabilitySchema } from "../validators/partnerValidator";

const router = Router();

console.log("Partner routes initialized");

router.get("/", protect, getPartners);
router.post("/availability", protect, validate(toggleAvailabilitySchema), toggleAvailability);
router.get("/orders", protect, getMyOrders);
router.get("/:partnerId/orders", getPartnerOrders);

export default router;
