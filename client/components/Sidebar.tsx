"use client";

import { useAuth } from "@/hooks/useAuth";
import { RootState } from "@/store";
import { fetchPartnerDetailsRequest, togglePartnerAvaibilityRequest } from "@/store/slices/partnerSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar({ role }: { role: "admin" | "partner" }) {
    const { logout } = useAuth();
    const dispatch = useDispatch();
    const { partner, loading } = useSelector((state: RootState) => state.partners);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUserId(parsed?.id || null);
            } catch (err) {
                console.error("Error parsing user from localStorage:", err);
            }
        }
    }, []);

    useEffect(() => {
        if (!userId) return;
        console.log("userId", userId)
        if (role === "partner" && userId) {
            dispatch(fetchPartnerDetailsRequest(userId));
        }
    }, [dispatch, role, userId]);

    const handleToggleAvailability = () => {
        if (!partner) return;
        dispatch(togglePartnerAvaibilityRequest({ userId: partner?._id, available: !partner?.available }));
    };
    return (
        <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-6 space-y-6 flex flex-col h-full">
            <div className="border-b border-sidebar-border pb-4">
                <h2 className="text-2xl font-bold text-sidebar-foreground">Dashboard</h2>
            </div>

            {role === "admin" ? (
                <div className="h-full flex flex-col justify-between">
                    <nav className="space-y-2">
                        <Link
                            href="/dash/orders"
                            className="block px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
                        >
                            Orders
                        </Link>
                        <Link
                            href="/dash/partners"
                            className="block px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
                        >
                            Partners
                        </Link>
                        <Link
                            href="/dash/settings"
                            className="block px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
                        >
                            Settings
                        </Link>
                    </nav>

                    <div className="border-t border-sidebar-border pt-4">
                        <button
                            onClick={logout}
                            className="w-full px-3 py-2 text-left rounded-md text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col justify-between">
                    <nav className="space-y-2">
                        <Link
                            href="/part/orders"
                            className="block px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
                        >
                            My Orders
                        </Link>
                        <Link
                            href="/part/profile"
                            className="block px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
                        >
                            Profile
                        </Link>
                        <Link
                            href="/part/map"
                            className="block px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
                        >
                            Map
                        </Link>
                    </nav>

                    <div>
                        <div className="my-4 p-3 border rounded-md bg-sidebar-accent ">
                            {loading ? (
                                <p className="text-sm text-muted">Loading...</p>
                            ) : partner ? (
                                <button
                                    onClick={handleToggleAvailability}
                                    className={`w-full px-3 py-2 rounded-md transition-colors duration-200 ${partner.available
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : "bg-gray-400 text-white hover:bg-gray-500"
                                        }`}
                                >
                                    {partner.available ? "Available" : "Not Available"}
                                </button>
                            ) : (
                                <p className="text-sm text-muted">No partner data</p>
                            )}
                        </div>
                        <div className="border-t border-sidebar-border pt-4">
                            <button
                                onClick={logout}
                                className="w-full px-3 py-2 text-left rounded-md text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
