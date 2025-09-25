import { call, put, takeLatest } from "redux-saga/effects";
import api from "@/lib/api";
import { loginRequest, loginSuccess, loginFailure } from "../slices/authSlice";

function* loginWorker(action: ReturnType<typeof loginRequest>): Generator<any, void, any> {
    try {
        const res = yield call(api.post, "/auth/login", action.payload);
        const { token, user } = res.data.data; // ✅ backend standardized
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        yield put(loginSuccess({ token, user }));
    } catch (err: any) {
        yield put(loginFailure(err.response?.data?.message || "Login failed"));
    }
}

export default function* authSaga() {
    yield takeLatest(loginRequest.type, loginWorker);
}
