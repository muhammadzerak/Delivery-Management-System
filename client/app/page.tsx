"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { loginRequest } from "@/store/slices/authSlice";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function HomePage() {
  const { login } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      // redirect handled by AuthProvider
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }

  };

  return (
    <main className="h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleLogin}
        className="bg-card p-6 rounded-lg shadow-lg w-96 space-y-4 border border-border"
      >
        <h1 className="text-xl font-bold text-card-foreground">Login</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full bg-input border border-border text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-input border border-border text-foreground placeholder:text-muted-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-medium px-4 py-3 rounded-md hover:bg-primary/90 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
