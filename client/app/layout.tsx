// app/layout.tsx (server component)
import type { Metadata } from "next";
import ClientProviders from "./ClientProviders";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "Delivery Management System",
  description: "Admin and Partner Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
