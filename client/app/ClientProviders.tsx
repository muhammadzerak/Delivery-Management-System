// app/ClientProviders.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthProvider } from "@/context/AuthContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthProvider>{children}</AuthProvider>
        </Provider>
    );
}
