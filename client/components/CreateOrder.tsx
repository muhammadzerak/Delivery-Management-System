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
        <div className="p-6 border border-border rounded-lg bg-card shadow-lg mb-6 transition-all duration-200 hover:shadow-xl">
            <h2 className="font-bold text-xl mb-4 text-card-foreground">Create New Order</h2>
            <div className="flex flex-col gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Order Title</label>
                    <input
                        type="text"
                        placeholder="Enter order title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-input border border-border text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Latitude</label>
                        <input
                            type="text"
                            placeholder="Enter latitude"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            className="w-full bg-input border border-border text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Longitude</label>
                        <input
                            type="text"
                            placeholder="Enter longitude"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            className="w-full bg-input border border-border text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>
                <button
                    onClick={createOrder}
                    className="w-full bg-primary text-black font-medium px-4 py-3 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 mt-2 bg-white"
                >
                    Create Order
                </button>
            </div>
        </div>
        // <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
        //     <h2 className="font-bold text-lg mb-2">Create New Order</h2>
        //     <div className="flex flex-col gap-2">
        //         <input
        //             type="text"
        //             placeholder="Order Title"
        //             value={title}
        //             onChange={(e) => setTitle(e.target.value)}
        //             className="border px-2 py-1 rounded"
        //         />
        //         <input
        //             type="text"
        //             placeholder="Latitude"
        //             value={lat}
        //             onChange={(e) => setLat(e.target.value)}
        //             className="border px-2 py-1 rounded"
        //         />
        //         <input
        //             type="text"
        //             placeholder="Longitude"
        //             value={lng}
        //             onChange={(e) => setLng(e.target.value)}
        //             className="border px-2 py-1 rounded"
        //         />
        //         <button
        //             onClick={createOrder}
        //             className="bg-green-600 text-white px-3 py-1 rounded"
        //         >
        //             Create Order
        //         </button>
        //     </div>
        // </div>
    );
}
