import { Request, Response } from "express";
import Order from "../models/Order";
import { success, failure } from "../utils/response";

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find();
        return success(res, orders, "Orders fetched successfully");
    } catch (err) {
        return failure(res, "Failed to fetch orders");
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { title, location } = req.body;
        const order = new Order({ title, location });
        await order.save();

        return success(res, order, "Order created successfully", 201);
    } catch (err) {
        return failure(res, "Failed to create order");
    }
};

export const assignOrder = async (req: Request, res: Response) => {
    try {
        const { orderId, partnerId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) return failure(res, "Order not found", 404);

        order.partnerId = partnerId;
        await order.save();

        return success(res, order, "Order assigned successfully");
    } catch (err) {
        return failure(res, "Failed to assign order");
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const { orderId } = req.params;
        console.log("req.body",req.body, "req.params", req.params)
        const order = await Order.findById(orderId);
        if (!order) return failure(res, "Order not found", 404);

        order.status = status;
        await order.save();

        return success(res, order, "Order status updated successfully");
    } catch (err) {
        console.log("err", err)
        return failure(res, "Failed to update order status");
    }
};
