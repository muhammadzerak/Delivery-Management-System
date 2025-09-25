import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Extend Request interface
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

// Verify JWT
export const protect = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "Not authorized" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Admin-only middleware
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "admin")
        return res.status(403).json({ message: "Admin only" });
    next();
};
