import { Router } from "express";
import { getMyOrders, getPartner, getPartnerOrders, getPartners, toggleAvailability } from "../controllers/partnerController";
import { protect } from "../middleware/authMiddleware";
import { validate } from "../middleware/validate";
import { toggleAvailabilitySchema } from "../validators/partnerValidator";

const router = Router();

router.get("/", protect, getPartners);
router.post("/availability", protect, validate(toggleAvailabilitySchema), toggleAvailability);
router.get("/orders", protect, getMyOrders);
router.get("/:partnerId/orders", getPartnerOrders);
router.get("/:id", protect, getPartner);

export default router;
