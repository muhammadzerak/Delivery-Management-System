import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import partnerRoutes from "./routes/partnerRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(
    cors({
        origin: "https://delivery-management-system-6bhk.vercel.app/",
        credentials: true,              // allow cookies/auth headers
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Health Check!"
    })
})

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/partners", partnerRoutes);

app.use((err: any, req: Request, res: Response, next: any) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
