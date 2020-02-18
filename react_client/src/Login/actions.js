import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  TOKEN_EXPIRED,
  TOKEN_NOT_FOUND,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  TOKEN_REFRESH_REQUEST,
  TOKEN_REFRESH_FAILURE,
  TOKEN_REFRESH_SUCCESS,
} from './constants';

export const loginRequest = values => {
  const { username, password } = values;
  return {
    type: LOGIN_REQUEST,
    payload: {
      username,
      password,
    },
    meta: {
      thunk: true,
    },
  };
};

export const loginSuccess = (username, token, refreshToken, meta) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      username,
      token,
      refreshToken,
    },
    meta,
  };
};

export const loginFailure = (error, meta) => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      error,
    },
    error: true,
    meta,
  };
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const tokenRefreshRequest = () => {
  return {
    type: TOKEN_REFRESH_REQUEST,
  };
};

export const tokenRefreshSuccess = token => {
  return {
    type: TOKEN_REFRESH_SUCCESS,
    payload: {
      token,
    },
  };
};

export const tokenRefreshFailure = error => {
  return {
    type: TOKEN_REFRESH_FAILURE,
    payload: {
      error,
    },
    error: true,
  };
};

export const tokenExpired = () => {
  return {
    type: TOKEN_EXPIRED,
  };
};

export const tokenNotFound = () => {
  return {
    type: TOKEN_NOT_FOUND,
  };
};
