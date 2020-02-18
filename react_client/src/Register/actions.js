import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from './constants';

export const registerUserRequest = ({
  username,
  email,
  password,
  rePassword,
}) => {
  return {
    type: REGISTER_USER_REQUEST,
    payload: {
      username,
      email,
      password,
      rePassword,
    },
    meta: {
      thunk: true,
    },
  };
};

export const registerUserSuccesss = (response, meta) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      response,
    },
    meta,
  };
};

export const registerUserFailure = (error, meta) => {
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      error,
    },
    error: true,
    meta,
  };
};
