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
    <main className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <h1 className="text-xl font-bold">Login</h1>
        {error && <p className="text-red-600">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
