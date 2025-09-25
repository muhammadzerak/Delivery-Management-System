"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Sidebar({ role }: { role: "admin" | "partner" }) {
    const { logout } = useAuth();
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

                    <div className="border-t border-sidebar-border pt-4">
                        <button
                            onClick={logout}
                            className="w-full px-3 py-2 text-left rounded-md text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </aside>
        // <aside className="w-64 bg-gray-800 text-white p-4 space-y-4 flex flex-col">
        //     <h2 className="text-xl font-bold h-5">Dashboard</h2>
        //     {role === "admin" ? (
        //         <div className=" h-full flex flex-col justify-between">
        //             <div className=" py-1">
        //                 <Link href="/dash/orders" className="block hover:underline">Orders</Link>
        //                 <Link href="/dash/partners" className="block hover:underline">Partners</Link>
        //                 <Link href="/dash/settings" className="block hover:underline">Settings</Link>
        //             </div>
        //             <div>
        //                 <span onClick={logout} className="block hover:underline">logout</span>
        //             </div>
        //         </div>
        //     ) : (
        //         <div className=" h-full flex flex-col justify-between">
        //             <div className=" py-1">
        //                 <Link href="/part/orders" className="block hover:underline">My Orders</Link>
        //                 <Link href="/part/profile" className="block hover:underline">Profile</Link>
        //                 <Link href="/part/map" className="block hover:underline">Map</Link>
        //             </div>
        //             <div>
        //                 <span onClick={logout} className="block hover:underline">logout</span>
        //             </div>
        //         </div>
        //     )}
        // </aside>
    );
}
