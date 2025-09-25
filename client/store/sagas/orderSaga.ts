import { call, put, takeLatest } from "redux-saga/effects";
import api from "@/lib/api";
import { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure, createOrderRequest, createOrderSuccess, createOrderFailure, assignOrderRequest } from "../slices/orderSlice";

function* fetchOrdersWorker(): Generator {
    try {
        const res = yield call(api.get, "/orders");
        yield put(fetchOrdersSuccess(res.data.data));
    } catch (err: any) {
        yield put(fetchOrdersFailure("Failed to fetch orders"));
    }
}

function* createOrderWorker(action: ReturnType<typeof createOrderRequest>): Generator {
    try {
        const res = yield call(api.post, "/orders", action.payload);
        yield put(createOrderSuccess(res.data.data));
    } catch (err: any) {
        yield put(createOrderFailure("Failed to create order"));
    }
}

function* assignOrderWorker(action: ReturnType<typeof assignOrderRequest>): Generator {
    try {
        const res = yield call(api.post, "/orders/assign", action.payload);
        yield put(createOrderSuccess(res.data.data));
    } catch (err: any) {
        yield put(createOrderFailure("Failed to create order"));
    }
}


export default function* orderSaga() {
    yield takeLatest(fetchOrdersRequest.type, fetchOrdersWorker);
    yield takeLatest(createOrderRequest.type, createOrderWorker);
    yield takeLatest(assignOrderRequest.type, assignOrderWorker);
}
