"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchPartnersRequest } from "@/store/slices/partnerSlice";
import PartnerCard from "@/components/PartnerCard";
import Loader from "@/components/Loader";

export default function PartnersPage() {
    const dispatch = useDispatch();
    const { list: partners, loading, error } = useSelector(
        (state: RootState) => state.partners
    );

    useEffect(() => {
        dispatch(fetchPartnersRequest());
    }, [dispatch]);

    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Delivery Partners</h1>
            <div className="grid gap-4">
                {loading
                    ? <Loader />
                    : partners?.map((partner) => (
                        <PartnerCard key={partner._id} partner={partner} />
                    ))}
            </div>
        </div>
    );
}
