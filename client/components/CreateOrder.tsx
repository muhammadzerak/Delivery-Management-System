"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrderRequest } from "@/store/slices/orderSlice";

export default function CreateOrder({ onCreated }: { onCreated: () => void }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const createOrder = () => {
        const payload = {
            title,
            location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        };
        dispatch(createOrderRequest(payload));
        onCreated();
        setTitle("");
        setLat("");
        setLng("");
    };

    return (
        <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
            <h2 className="font-bold text-lg mb-2">Create New Order</h2>
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Order Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="text"
                    placeholder="Latitude"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="border px-2 py-1 rounded"
                />
                <button
                    onClick={createOrder}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                >
                    Create Order
                </button>
            </div>
        </div>
    );
}
