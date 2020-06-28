import { put, takeEvery, delay, all, call } from "redux-saga/effects";
import * as actionTypes from "./constants";
import {
  authStart,
  authFail,
  authSuccess,
  checkAuthTimeout,
  logout,
  logoutSuccess,
} from "./actions";
import Axios from "axios";

function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(logoutSuccess());
}

function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logout());
}

function* authSaga(action) {
  yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRsj7HtorwCladgTQfmvcANiKedMvO-bM";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRsj7HtorwCladgTQfmvcANiKedMvO-bM";
  }

  try {
    const res = yield Axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", res.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", res.data.localId);

    yield put(authSuccess(res.data.idToken, res.data.localId));
    yield put(checkAuthTimeout(res.data.expiresIn));
  } catch (error) {
    yield put(authFail(error.response.data.error));
  }
}

function* checkAuthStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(logout());
  } else {
    const expireDate = yield new Date(localStorage.getItem("expirationDate"));

    if (expireDate <= new Date()) {
      yield put(logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(authSuccess(token, userId));
      yield put(
        checkAuthTimeout((expireDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
}

function* onAuthStartInit() {
  yield takeEvery(actionTypes.AUTH_START_INIT, authSaga);
}

function* onLogoutInit() {
  yield takeEvery(actionTypes.AUTH_LOGOUT_INIT, logoutSaga);
}

function* onCheckTimeOutInit() {
  yield takeEvery(actionTypes.CHECK_TIME_OUT_INIT, checkAuthTimeoutSaga);
}

function* onCheckStateInit() {
  yield takeEvery(actionTypes.CHECK_TIME_OUT_STATE_INIT, checkAuthStateSaga);
}

export function* watchAuth() {
  yield all([
    call(onAuthStartInit),
    call(onLogoutInit),
    call(onCheckTimeOutInit),
    call(onCheckStateInit),
  ]);
}
