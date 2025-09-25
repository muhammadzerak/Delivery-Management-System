import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import orderSaga from "./orderSaga";
import partnerSaga from "./partnerSaga";

export default function* rootSaga() {
    yield all([authSaga(), orderSaga(), partnerSaga()]);
}
