"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import api from "@/lib/api"

export default function RegisterPage() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState<"admin" | "partner">("admin")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await api.post("/auth/register", { username, password, role });

            router.push("/")
        } catch (err: any) {
            console.log("err",err)
            setError(err.response.data.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="h-screen flex items-center justify-center bg-background">
            <form onSubmit={handleRegister} className="bg-card p-6 rounded-lg shadow-lg w-96 space-y-4 border border-border">
                <h1 className="text-xl font-bold text-card-foreground">Register</h1>
                {error && <p className="text-red-600 text-sm">{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full bg-input border border-border text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    value={username}
                    min={3}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-input border border-border text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    value={password}
                    min={6}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as "admin" | "partner")}
                    className="w-full bg-input border border-border text-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    required
                >
                    <option value="admin">Admin</option>
                    <option value="partner">Partner</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-medium px-4 py-3 rounded-md hover:bg-primary/90 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-sm text-muted-foreground text-center">
                    Already have an account?{" "}
                    <Link href="/" className="text-primary hover:underline">
                        Login here
                    </Link>
                </p>
            </form>
        </main>
    )
}
