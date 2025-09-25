"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Sidebar({ role }: { role: "admin" | "partner" }) {
    const { logout } = useAuth();
    return (
        <aside className="w-64 bg-gray-800 text-white p-4 space-y-4 flex flex-col">
            <h2 className="text-xl font-bold h-5">Dashboard</h2>
            {role === "admin" ? (
                <div className=" h-full flex flex-col justify-between">
                    <div className=" py-1">
                        <Link href="/dash/orders" className="block hover:underline">Orders</Link>
                        <Link href="/dash/partners" className="block hover:underline">Partners</Link>
                        <Link href="/dash/settings" className="block hover:underline">Settings</Link>
                    </div>
                    <div>
                        <span onClick={logout} className="block hover:underline">logout</span>
                    </div>
                </div>
            ) : (
                <div className=" h-full flex flex-col justify-between">
                    <div className=" py-1">
                        <Link href="/part/orders" className="block hover:underline">My Orders</Link>
                        <Link href="/part/profile" className="block hover:underline">Profile</Link>
                        <Link href="/part/map" className="block hover:underline">Map</Link>
                    </div>
                    <div>
                        <span onClick={logout} className="block hover:underline">logout</span>
                    </div>
                </div>
            )}
        </aside>
    );
}
