import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Partner {
  _id: string;
  username: string;
  password: string;
  role: "admin" | "partner";
  available: boolean;
  __v: number;
}
interface PartnerState {
    list: any[];
    partner: Partner | null;
    orders: any[];
    loading: boolean;
    partnerLoading: boolean;
    error: string | null;
}

const initialState: PartnerState = {
    list: [],
    partner: null,
    orders: [],
    loading: false,
    partnerLoading: false,
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
        fetchPartnerDetailsRequest: (state, action: PayloadAction<any>) => {
            state.partnerLoading = true;
        },
        fetchPartnerDetailsSuccess: (state, action: PayloadAction<any>) => {
            state.partnerLoading = false;
            state.partner = action.payload;
        },
        fetchPartnerDetailsFailure: (state, action: PayloadAction<string>) => {
            state.partnerLoading = false;
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
            state.orders = state.orders?.map((o) => (o._id === action.payload._id ? { ...o, status: action.payload.status } : o));
        },
        updateOrderStatusFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        togglePartnerAvaibilityRequest: (state, _action: PayloadAction<any>) => {
            state.loading = true;
        },
        togglePartnerAvaibilitySuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.partner = action.payload
        },
        togglePartnerAvaibilityFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchPartnersRequest, fetchPartnersSuccess, fetchPartnersFailure, fetchPartnersOrdersRequest, fetchPartnersOrdersSuccess, fetchPartnersOrdersFailure,
    updateOrderStatusRequest, updateOrderStatusSuccess, updateOrderStatusFailure, togglePartnerAvaibilityRequest, togglePartnerAvaibilitySuccess, togglePartnerAvaibilityFailure,
    fetchPartnerDetailsRequest, fetchPartnerDetailsSuccess, fetchPartnerDetailsFailure
 } =
    partnerSlice.actions;
export default partnerSlice.reducer;
