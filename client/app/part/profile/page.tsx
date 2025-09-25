// app/part/profile/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function PartnerProfile() {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            {user && (
                <div className="bg-white shadow p-4 rounded">
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            )}
        </div>
    );
}
