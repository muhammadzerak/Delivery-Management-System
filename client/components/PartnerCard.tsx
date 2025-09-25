"use client";

import Link from "next/link";
import { User, CheckCircle, XCircle } from "lucide-react"

interface PartnerCardProps {
    partner: any;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
    return (
        <div className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-border bg-card hover:bg-card/80 backdrop-blur-sm">
            <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Partner Info Section */}
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="flex-shrink-0 w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center ring-2 ring-border/20">
                            <User className="w-6 h-6 text-muted-foreground" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-foreground text-lg leading-tight mb-3 group-hover:text-primary transition-colors">
                                {partner.username}
                            </h3>

                            <div className="flex items-center gap-2">
                                <div
                                    // variant={partner.available ? "default" : "secondary"}
                                    className={`flex items-center gap-1.5 font-medium transition-all duration-200 ${partner.available
                                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30 shadow-emerald-500/10 shadow-sm"
                                            : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 shadow-red-500/10 shadow-sm"
                                        }`}
                                >
                                    {partner.available ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                    {partner.available ? "Available" : "Unavailable"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                        <Link href="/dash/orders">
                            <button
                                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                                disabled={!partner.available}
                            >
                                Assign Order
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        // <div className="bg-white p-4 rounded shadow flex justify-between items-center">
        //     <div>
        //         <p><strong>Name:</strong> {partner.username}</p>
        //         <p><strong>Status:</strong> {partner.available == true ? "Available" : "Unavailable"}</p>
        //     </div>
        //     <Link href="/dash/orders">
        //     <button className="bg-blue-600 text-white px-3 py-1 rounded">
        //         Assign Order
        //     </button>
        //     </Link>
        // </div>
    );
}
