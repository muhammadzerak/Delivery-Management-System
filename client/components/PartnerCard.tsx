"use client";

import Link from "next/link";

interface PartnerCardProps {
    partner: any;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
    return (
        <div className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
                <p><strong>Name:</strong> {partner.username}</p>
                <p><strong>Status:</strong> {partner.available == true ? "Available" : "Unavailable"}</p>
            </div>
            <Link href="/dash/orders">
            <button className="bg-blue-600 text-white px-3 py-1 rounded">
                Assign Order
            </button>
            </Link>
        </div>
    );
}
