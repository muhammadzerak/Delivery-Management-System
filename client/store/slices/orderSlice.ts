import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
    list: any[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    list: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        fetchOrdersRequest: (state) => {
            state.loading = true;
        },
        fetchOrdersSuccess: (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.list = action.payload;
        },
        fetchOrdersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        createOrderRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
        },
        createOrderSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.list.push(action.payload);
        },
        createOrderFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        assignOrderRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
        },
        assignOrderSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
        },
        assignOrderFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure, createOrderRequest, createOrderSuccess, createOrderFailure,
    assignOrderRequest, assignOrderSuccess, assignOrderFailure
} = orderSlice.actions;
export default orderSlice.reducer;
