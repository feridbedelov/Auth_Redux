import { call, all } from "redux-saga/effects";
import { watchAuth } from "./Auth/saga";

export function* rootSaga() {
  yield all([call(watchAuth)]);
}
