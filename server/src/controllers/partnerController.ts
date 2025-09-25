import { Request, Response } from "express";
import User from "../models/User";
import Order from "../models/Order";
import { failure, success } from "../utils/response";


export const getPartner = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const partners = await User.findOne({ _id: id, role: "partner" });
        return success(res, partners, "Partner fetched successfully");
    } catch (err) {
        console.log({ err });
        return failure(res, "Failed to fetch partner details");
    }
};

export const getPartners = async (req: Request, res: Response) => {
    try {
        const partners = await User.find({ role: "partner" });
        return success(res, partners, "Partners fetched successfully");
    } catch (err) {
        console.log({ err });
        return failure(res, "Failed to fetch partners");
    }
};

export const toggleAvailability = async (req: Request, res: Response) => {
    try {
        const { userId, available } = req.body;
        const partner = await User.findById(userId);

        if (!partner || partner.role !== "partner") {
            return failure(res, "Partner not found", 404);
        }

        partner.available = available;
        await partner.save();

        return success(res, partner, "Partner availability updated");
    } catch (error) {
        console.log({ error });
        return failure(res, "Failed to toggle availability");
    }
};

export const getPartnerOrders = async (req: Request, res: Response) => {
    try {
        const { partnerId } = req.params;
        const orders = await Order.find({ partnerId });
        return success(res, orders, "Partner orders fetched successfully");
    } catch (err) {
        console.log({ err });
        return failure(res, "Failed to fetch partner orders");
    }
};

export const getMyOrders = async (req: Request, res: Response) => {
    try {
        const partnerId = (req as any).user.id; // from JWT middleware
        const orders = await Order.find({ partnerId });
        return success(res, orders, "My orders fetched successfully");
    } catch (err) {
        console.log({ err });
        return failure(res, "Failed to fetch my orders");
    }
};
