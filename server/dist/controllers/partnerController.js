"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyOrders = exports.getPartnerOrders = exports.toggleAvailability = exports.getPartners = exports.getPartner = void 0;
const User_1 = __importDefault(require("../models/User"));
const Order_1 = __importDefault(require("../models/Order"));
const response_1 = require("../utils/response");
const getPartner = async (req, res) => {
    try {
        const { id } = req.params;
        const partners = await User_1.default.findOne({ _id: id, role: "partner" });
        return (0, response_1.success)(res, partners, "Partner fetched successfully");
    }
    catch (err) {
        console.log({ err });
        return (0, response_1.failure)(res, "Failed to fetch partner details");
    }
};
exports.getPartner = getPartner;
const getPartners = async (req, res) => {
    try {
        const partners = await User_1.default.find({ role: "partner" });
        return (0, response_1.success)(res, partners, "Partners fetched successfully");
    }
    catch (err) {
        console.log({ err });
        return (0, response_1.failure)(res, "Failed to fetch partners");
    }
};
exports.getPartners = getPartners;
const toggleAvailability = async (req, res) => {
    try {
        const { userId, available } = req.body;
        const partner = await User_1.default.findById(userId);
        if (!partner || partner.role !== "partner") {
            return (0, response_1.failure)(res, "Partner not found", 404);
        }
        partner.available = available;
        await partner.save();
        return (0, response_1.success)(res, partner, "Partner availability updated");
    }
    catch (error) {
        console.log({ error });
        return (0, response_1.failure)(res, "Failed to toggle availability");
    }
};
exports.toggleAvailability = toggleAvailability;
const getPartnerOrders = async (req, res) => {
    try {
        const { partnerId } = req.params;
        const orders = await Order_1.default.find({ partnerId });
        return (0, response_1.success)(res, orders, "Partner orders fetched successfully");
    }
    catch (err) {
        console.log({ err });
        return (0, response_1.failure)(res, "Failed to fetch partner orders");
    }
};
exports.getPartnerOrders = getPartnerOrders;
const getMyOrders = async (req, res) => {
    try {
        const partnerId = req.user.id; // from JWT middleware
        const orders = await Order_1.default.find({ partnerId });
        return (0, response_1.success)(res, orders, "My orders fetched successfully");
    }
    catch (err) {
        console.log({ err });
        return (0, response_1.failure)(res, "Failed to fetch my orders");
    }
};
exports.getMyOrders = getMyOrders;
