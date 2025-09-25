// app/dash/layout.tsx
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar role="admin" />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
