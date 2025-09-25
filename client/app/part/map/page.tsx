// app/partner/map/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchPartnersOrdersRequest } from "@/store/slices/partnerSlice";
import Loader from "@/components/Loader";
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function PartnerMapPage() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(
        (state: RootState) => state.partners
    );

    useEffect(() => {
        dispatch(fetchPartnersOrdersRequest());
    }, [dispatch]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Orders Map</h1>
            {loading
                ? <Loader />
                : <MapView orders={orders} />
            }
        </div>
    );
}
