"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Loader from "@/components/Loader";

interface User {
    id: string;
    username: string;
    role: "admin" | "partner";
    available: Boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Failed to parse stored user:", err);
                localStorage.removeItem("user"); // clear invalid data
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log("effect")
        if (!user || loading) return;
        if (user.role === "admin") router.push("/dash");
        else router.push("/part");
    }, [user, loading, router]);

    if (loading) return <Loader />;

    const login = async (username: string, password: string) => {
        try {
            const res = await api.post("/auth/login", { username, password });
            const loggedInUser = res.data?.data?.user;

            localStorage.setItem("token", res.data?.data.token);
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            setUser(loggedInUser);

            // if (loggedInUser.role === "admin") router.push("/dash");
            // else router.push("/part");

        } catch (err: any) {
            console.error("Login failed:", err.response?.data || err.message);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be inside AuthProvider");
    return context;
};
