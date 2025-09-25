"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Navbar({ role }: { role: "admin" | "partner" }) {
    const { logout } = useAuth();
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
            <span className="font-bold">
                {role === "admin" ? "Admin Panel" : "Partner Panel"}
            </span>
            <button className="bg-red-500 px-3 py-1 rounded" onClick={() => logout()}>Logout</button>
        </nav>
    );
}
