"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../utils/response");
const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const existing = await User_1.default.findOne({ username });
        if (existing)
            return (0, response_1.failure)(res, "User already exists", 400);
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ username, password: hashedPassword, role });
        await user.save();
        return (0, response_1.success)(res, { userId: user._id }, "User registered successfully");
    }
    catch (err) {
        return (0, response_1.failure)(res, "Registration failed");
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User_1.default.findOne({ username });
        if (!user)
            return (0, response_1.failure)(res, "Invalid credentials", 401);
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return (0, response_1.failure)(res, "Invalid credentials", 401);
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
        return (0, response_1.success)(res, {
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                available: user.available,
            },
        }, "Login successful");
    }
    catch (err) {
        return (0, response_1.failure)(res, "Login failed");
    }
};
exports.login = login;
