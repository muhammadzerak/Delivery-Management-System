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
        <div>
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            <div className="space-y-4">
                {loading
                    ? <Loader />
                    : orders.length > 0 && orders?.map((order) => (
                        <div
                            key={order?._id}
                            className="p-4 border rounded bg-white shadow-sm flex justify-between"
                        >
                            <div>
                                <p className="font-bold">Order #{order?._id}</p>
                                <p>Customer: {order?.title}</p>
                                <p>Status: {order?.status}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                {order?.status == "pending" &&
                                    <button
                                        onClick={() => updateStatus(order?._id, "in-progress")}
                                        className="bg-yellow-500 text-white px-2 rounded"
                                    >
                                        Start
                                    </button>
                                }
                                {order?.status == "in-progress" &&
                                    <button
                                        onClick={() => updateStatus(order?._id, "delivered")}
                                        className="bg-green-600 text-white px-2 rounded"
                                    >
                                        Deliver
                                    </button>
                                }
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
