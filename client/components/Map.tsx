"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map({ location }: { location: string }) {
    // Dummy coords until you connect geocoding
    const position: [number, number] = [28.6139, 77.209]; // New Delhi coords

    return (
        <MapContainer center={position} zoom={13} className="w-full h-64 rounded">
            <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>{location}</Popup>
            </Marker>
        </MapContainer>
    );
}
