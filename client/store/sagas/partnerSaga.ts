import { call, put, takeLatest } from "redux-saga/effects";
import api from "@/lib/api";
import {
    fetchPartnersRequest,
    fetchPartnersSuccess,
    fetchPartnersFailure,
    fetchPartnersOrdersSuccess,
    fetchPartnersOrdersFailure,
    fetchPartnersOrdersRequest,
    updateOrderStatusRequest,
    updateOrderStatusFailure,
    updateOrderStatusSuccess,
    togglePartnerAvaibilityRequest,
    togglePartnerAvaibilitySuccess,
    togglePartnerAvaibilityFailure,
    fetchPartnerDetailsSuccess,
    fetchPartnerDetailsFailure,
    fetchPartnerDetailsRequest,
} from "../slices/partnerSlice";

function* fetchPartnersWorker(): Generator {
    try {
        const res = yield call(api.get, "/partners");
        yield put(fetchPartnersSuccess(res.data.data));
    } catch (err: any) {
        yield put(fetchPartnersFailure("Failed to fetch partners"));
    }
}

function* fetchPartnersOrders(): Generator {
    try {
        const res = yield call(api.get, "/partners/orders");
        yield put(fetchPartnersOrdersSuccess(res.data?.data));
    } catch (err: any) {
        yield put(fetchPartnersOrdersFailure("Failed to fetch partners orders"));
    }
}

function* updateOrderStatus(action: ReturnType<typeof updateOrderStatusRequest>): Generator {
    try {
        const res = yield call(api.patch, `/orders/${action.payload.id}/status`, action.payload);
        yield put(updateOrderStatusSuccess(res.data?.data));
    } catch (err: any) {
        yield put(updateOrderStatusFailure("Failed to update order status"));
    }
}

function* togglePartnerAvaibilityStatus(action: ReturnType<typeof togglePartnerAvaibilityRequest>): Generator {
    try {
        console.log("action.payload",action.payload)
        const res = yield call(api.post, `/partners/availability`, action.payload);
        yield put(togglePartnerAvaibilitySuccess(res.data?.data));
    } catch (err: any) {
        yield put(togglePartnerAvaibilityFailure("Failed to update status"));
    }
}

function* fetchPartnerDetails(action: ReturnType<typeof fetchPartnerDetailsRequest>): Generator {
    try {
        const res = yield call(api.get, `/partners/${action.payload}`);
        yield put(fetchPartnerDetailsSuccess(res.data?.data));
    } catch (err: any) {
        yield put(fetchPartnerDetailsFailure("Failed to update fetch User data"));
    }
}

export default function* partnerSaga() {
    yield takeLatest(fetchPartnersRequest.type, fetchPartnersWorker);
    yield takeLatest(fetchPartnersOrdersRequest.type, fetchPartnersOrders);
    yield takeLatest(updateOrderStatusRequest.type, updateOrderStatus);
    yield takeLatest(togglePartnerAvaibilityRequest.type, togglePartnerAvaibilityStatus);
    yield takeLatest(fetchPartnerDetailsRequest.type, fetchPartnerDetails);
}
