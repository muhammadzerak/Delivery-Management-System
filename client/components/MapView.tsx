// components/MapViewInner.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DefaultIcon } from "@/lib/leaflet-icons";

type Location = { lat: number; lng: number };
type Order = {
    _id: string;
    title: string;
    status: string;
    location: Location;
};

function FitBounds({ orders }: { orders: Order[] }) {
    const map = useMap();
    const bounds = orders
        ?.filter(o => o.location?.lat && o.location?.lng && o.status === "in-progress")
        ?.map(o => [o.location.lat, o.location.lng] as [number, number]);

    if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
    }

    return null;
}

export default function MapViewInner({ orders }: { orders: Order[] }) {
    const validOrders = orders?.filter(o => o.location?.lat && o.location?.lng && o.status === "in-progress");

    return (
        <div className="h-[500px] w-full">
            <MapContainer
                center={[0, 0]}
                zoom={2}
                scrollWheelZoom={true}
                className="h-full w-full rounded-lg shadow-md"
            >
                <TileLayer
                    attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {validOrders?.map(order => (
                    <Marker
                        key={order._id}
                        position={[order.location.lat, order.location.lng]}
                        icon={DefaultIcon}
                    >
                        <Popup>
                            Order #{order._id} <br /> Customer: {order.title} <br /> Status: {order.status}
                        </Popup>
                    </Marker>
                ))}
                <FitBounds orders={validOrders} />
            </MapContainer>
        </div>
    );
}
