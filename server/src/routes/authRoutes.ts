import { Router } from "express";
import { login, register } from "../controllers/authController";
import { loginSchema, registerSchema } from "../validators/authValidator";
import { validate } from "../middleware/validate";

const router = Router();

// Public routes
router.post("/register", validate(registerSchema), register); // optional for testing
router.post("/login", validate(loginSchema), login);

export default router;
