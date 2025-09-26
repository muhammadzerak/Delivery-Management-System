"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.assignOrder = exports.createOrder = exports.getOrders = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const response_1 = require("../utils/response");
const getOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find();
        return (0, response_1.success)(res, orders, "Orders fetched successfully");
    }
    catch (err) {
        console.log({ err });
        return (0, response_1.failure)(res, "Failed to fetch orders");
    }
};
exports.getOrders = getOrders;
const createOrder = async (req, res) => {
    try {
        const { title, location } = req.body;
        const order = new Order_1.default({ title, location });
        await order.save();
        return (0, response_1.success)(res, order, "Order created successfully", 201);
    }
    catch (err) {
        console.log({ err });
        return (0, response_1.failure)(res, "Failed to create order");
    }
};
exports.createOrder = createOrder;
const assignOrder = async (req, res) => {
    try {
        const { orderId, partnerId } = req.body;
        const order = await Order_1.default.findById(orderId);
        if (!order)
            return (0, response_1.failure)(res, "Order not found", 404);
        order.partnerId = partnerId;
        await order.save();
        return (0, response_1.success)(res, order, "Order assigned successfully");
    }
    catch (err) {
        console.log({ err });
        return (0, response_1.failure)(res, "Failed to assign order");
    }
};
exports.assignOrder = assignOrder;
const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { orderId } = req.params;
        console.log("req.body", req.body, "req.params", req.params);
        const order = await Order_1.default.findById(orderId);
        if (!order)
            return (0, response_1.failure)(res, "Order not found", 404);
        order.status = status;
        await order.save();
        return (0, response_1.success)(res, order, "Order status updated successfully");
    }
    catch (err) {
        console.log("err", err);
        return (0, response_1.failure)(res, "Failed to update order status");
    }
};
exports.updateStatus = updateStatus;
