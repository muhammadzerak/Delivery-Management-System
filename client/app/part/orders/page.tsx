// app/partner/orders/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchPartnersOrdersRequest, updateOrderStatusRequest } from "@/store/slices/partnerSlice";
import Loader from "@/components/Loader";

export default function PartnerOrders() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(
        (state: RootState) => state.partners
    );

    useEffect(() => {
        dispatch(fetchPartnersOrdersRequest());
    }, [dispatch]);

    const updateStatus = async (id: string, status: string) => {
        const payload = { id, status }
        dispatch(updateOrderStatusRequest(payload));
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
                <p className="text-muted-foreground">Manage and track your assigned orders</p>
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader />
                    </div>
                ) : orders.length > 0 ? (
                    orders?.map((order) => (
                        <div
                            key={order?._id}
                            className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-semibold text-card-foreground">Order #{order?._id}</h3>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${order?.status === "pending"
                                                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                    : order?.status === "in-progress"
                                                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                                        : order?.status === "delivered"
                                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                            : "bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {order?.status}
                                        </span>
                                    </div>
                                    <p className="text-card-foreground">
                                        <span className="text-muted-foreground">Customer:</span> {order?.title}
                                    </p>
                                </div>

                                <div className="flex gap-3 items-center">
                                    {order?.status === "pending" && (
                                        <button
                                            onClick={() => updateStatus(order?._id, "in-progress")}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-background"
                                        >
                                            Start Order
                                        </button>
                                    )}
                                    {order?.status === "in-progress" && (
                                        <button
                                            onClick={() => updateStatus(order?._id, "delivered")}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-background"
                                        >
                                            Mark Delivered
                                        </button>
                                    )}
                                    {order?.status === "delivered" && (
                                        <div className="flex items-center gap-2 text-green-400">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="font-medium">Completed</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    /* Added empty state with better styling */
                    <div className="text-center py-12">
                        <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">No orders yet</h3>
                        <p className="text-muted-foreground">Orders assigned to you will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
}
