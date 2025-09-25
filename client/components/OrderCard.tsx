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
        <div className="p-6 border border-border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="space-y-4">
                <div className="space-y-2">
                    <p className="font-bold text-card-foreground text-lg">Order #{order?._id}</p>
                    <p className="text-muted-foreground">
                        Status: <span className="font-medium text-card-foreground">{order?.status}</span>
                    </p>
                </div>

                {order?.status === "pending" && !order?.partnerId ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <select
                            value={selectedPartner}
                            onChange={(e) => setSelectedPartner(e.target.value)}
                            className="flex-1 min-w-0 bg-input border border-border text-card-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors duration-200 hover:border-muted-foreground"
                        >
                            <option value="" className="bg-popover text-popover-foreground">
                                Select Partner
                            </option>
                            {partners.map((p) => (
                                <option key={p._id} value={p._id} className="bg-popover text-popover-foreground">
                                    {p.username}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleAssign}
                            disabled={!selectedPartner}
                            className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary whitespace-nowrap"
                        >
                            Assign Partner
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-green-400 font-semibold">Assigned</p>
                    </div>
                )}
            </div>
        </div>
        // <div className="p-4 border rounded-lg bg-white shadow-sm">
        //     <p className="font-bold">Order #{order?._id}</p>
        //     <p>Status: {order?.status}</p>

        //     {order?.status === "pending" && !order?.partnerId ? (
        //         <div className="flex items-center gap-2">
        //             <select
        //                 value={selectedPartner}
        //                 onChange={(e) => setSelectedPartner(e.target.value)}
        //                 className="border px-2 py-1 rounded"
        //             >
        //                 <option value="">Select Partner</option>
        //                 {partners.map((p) => (
        //                     <option key={p._id} value={p._id}>
        //                         {p.username}
        //                     </option>
        //                 ))}
        //             </select>
        //             <button
        //                 onClick={handleAssign}
        //                 className="bg-blue-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
        //                 disabled={!selectedPartner}
        //             >
        //                 Assign
        //             </button>
        //         </div>
        //     ) : (
        //         <p className="text-green-600 font-semibold">Assigned</p>
        //     )}
        // </div>
    );
}
