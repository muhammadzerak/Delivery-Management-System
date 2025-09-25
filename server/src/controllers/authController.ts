import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { failure, success } from "../utils/response";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;
        const existing = await User.findOne({ username });
        if (existing) return failure(res, "User already exists", 400);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();

        return success(res, { userId: user._id }, "User registered successfully");
    } catch (err) {
        return failure(res, "Registration failed");
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return failure(res, "Invalid credentials", 401);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return failure(res, "Invalid credentials", 401);

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return success(
            res,
            {
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    available: user.available,
                },
            },
            "Login successful"
        );
    } catch (err) {
        return failure(res, "Login failed");
    }
};
