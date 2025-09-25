// app/part/profile/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function PartnerProfile() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
                    <p className="text-muted-foreground">Manage your profile and create new orders</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Profile Information Card */}
                    {user && (
                        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-card-foreground mb-4">Profile Information</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="text-card-foreground font-medium">{user.username}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Role</p>
                                    <p className="text-card-foreground font-medium">{user.role}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Partner ID</p>
                                    <p className="text-card-foreground font-medium">{user.id}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Actions Card */}
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-card-foreground mb-4">Quick Actions</h2>
                        <div className="space-y-4">
                            {/* <Link href="/partner/create-order">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background">
                                    Create New Order
                                </button>
                            </Link> */}

                            <Link href="/part/orders">
                                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-background">
                                    View My Orders
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Statistics Card */}
                <div className="mt-6 bg-card border border-border rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-card-foreground mb-4">Order Statistics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-2xl font-bold text-foreground">12</p>
                            <p className="text-sm text-muted-foreground">Total Orders</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-2xl font-bold text-green-400">8</p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-2xl font-bold text-yellow-400">4</p>
                            <p className="text-sm text-muted-foreground">In Progress</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
