"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { assignOrderRequest } from "@/store/slices/orderSlice";

interface OrderCardProps {
    order: any;
    onAssign: () => void
}

export default function OrderCard({ order, onAssign }: OrderCardProps) {
    const dispatch = useDispatch();
    const { list: partners } = useSelector((state: RootState) => state.partners);
    const [selectedPartner, setSelectedPartner] = useState("");

    const handleAssign = () => {
        if (!selectedPartner) return;
        dispatch(assignOrderRequest({ orderId: order._id, partnerId: selectedPartner }));
        onAssign();
    };

    return (
        <div className="p-4 border rounded-lg bg-white shadow-sm">
            <p className="font-bold">Order #{order?._id}</p>
            <p>Status: {order?.status}</p>

            {order?.status === "pending" && !order?.partnerId ? (
                <div className="flex items-center gap-2">
                    <select
                        value={selectedPartner}
                        onChange={(e) => setSelectedPartner(e.target.value)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="">Select Partner</option>
                        {partners.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.username}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAssign}
                        className="bg-blue-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
                        disabled={!selectedPartner}
                    >
                        Assign
                    </button>
                </div>
            ) : (
                <p className="text-green-600 font-semibold">Assigned</p>
            )}
        </div>
    );
}
