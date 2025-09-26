// app/partner/layout.tsx
"use client"

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import { fetchPartnerDetailsRequest } from "@/store/slices/partnerSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export type PartnerUser = {
    id: string;
    username: string;
    role: "partner" | "admin"; // expand if more roles exist
    available: boolean;
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const [user, setUser] = useState<PartnerUser | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUser(parsed || null);
                console.log("parsed", parsed)
            } catch (err) {
                console.error("Error parsing user from localStorage:", err);
            }
        }
    }, []);

    useEffect(() => {
        if (!user?.id) return;
        if (user?.role === "partner" && user?.id) {
            dispatch(fetchPartnerDetailsRequest(user?.id));
        }
    }, [dispatch, user]);
    
    return (
        <ProtectedRoute role="partner">
            <div className="flex flex-col h-screen">
                <div className=" flex flex-row h-full">
                    <Sidebar role="partner" />
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
