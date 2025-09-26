"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
    children,
    role,
}: {
    children: React.ReactNode;
    role?: "admin" | "partner";
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (!loading) {
            if (!user) router.push("/");
            if (role && user?.role !== role) router.push("/");
        }
    }, [user, loading, role, router]);

    return <>{children}</>;
}
