import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT_INIT,
  CHECK_TIME_OUT_INIT,
  AUTH_START_INIT,
  CHECK_TIME_OUT_STATE_INIT,
  AUTH_LOGOUT,
} from "./constants";

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT_INIT,
  };
};

export const logoutSuccess = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: CHECK_TIME_OUT_INIT,
    expirationTime,
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: AUTH_START_INIT,
    email,
    password,
    isSignUp,
  };
};

export const checkAuthState = () => {
  return {
    type: CHECK_TIME_OUT_STATE_INIT,
  };
};
