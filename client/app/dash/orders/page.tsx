"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchOrdersRequest } from "@/store/slices/orderSlice";
import OrderCard from "@/components/OrderCard";
import CreateOrder from "@/components/CreateOrder";
import { fetchPartnersRequest } from "@/store/slices/partnerSlice";
import Loader from "@/components/Loader";

export default function OrdersPage() {
    const dispatch = useDispatch();
    const { list: orders, loading, error } = useSelector(
        (state: RootState) => state.orders
    );

    useEffect(() => {
        dispatch(fetchOrdersRequest());
        dispatch(fetchPartnersRequest());
    }, [dispatch]);

    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
            <CreateOrder onCreated={() => dispatch(fetchOrdersRequest())} />
            <div className="grid grid-cols-1 gap-4">
                {loading
                    ? <Loader />
                    : orders?.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            onAssign={() => dispatch(fetchOrdersRequest())}
                        />
                    ))}
            </div>
        </div>
    );
}
