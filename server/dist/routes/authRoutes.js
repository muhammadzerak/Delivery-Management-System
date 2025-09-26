"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authValidator_1 = require("../validators/authValidator");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
// Public routes
router.post("/register", (0, validate_1.validate)(authValidator_1.registerSchema), authController_1.register); // optional for testing
router.post("/login", (0, validate_1.validate)(authValidator_1.loginSchema), authController_1.login);
exports.default = router;
