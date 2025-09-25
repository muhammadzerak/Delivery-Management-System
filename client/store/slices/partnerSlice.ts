import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PartnerState {
    list: any[];
    orders: any[];
    loading: boolean;
    error: string | null;
}

const initialState: PartnerState = {
    list: [],
    orders: [],
    loading: false,
    error: null,
};

const partnerSlice = createSlice({
    name: "partners",
    initialState,
    reducers: {
        fetchPartnersRequest: (state) => {
            state.loading = true;
        },
        fetchPartnersSuccess: (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.list = action.payload;
        },
        fetchPartnersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchPartnersOrdersRequest: (state) => {
            state.loading = true;
        },
        fetchPartnersOrdersSuccess: (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.orders = action.payload;
        },
        fetchPartnersOrdersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateOrderStatusRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
        },
        updateOrderStatusSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.orders = state.orders.map((o) => (o._id === action.payload._id ? { ...o, status: action.payload.status } : o));
        },
        updateOrderStatusFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchPartnersRequest, fetchPartnersSuccess, fetchPartnersFailure, fetchPartnersOrdersRequest, fetchPartnersOrdersSuccess, fetchPartnersOrdersFailure,
    updateOrderStatusRequest, updateOrderStatusSuccess, updateOrderStatusFailure
 } =
    partnerSlice.actions;
export default partnerSlice.reducer;
