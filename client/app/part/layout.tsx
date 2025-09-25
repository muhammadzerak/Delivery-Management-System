// app/partner/layout.tsx
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute role="partner">
            <div className="flex flex-col h-screen">
                <div className=" flex flex-row h-full">
                    <Sidebar role="partner" />
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
