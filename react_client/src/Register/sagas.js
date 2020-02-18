import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { getAxiosError } from '../utils/getAxiosError';

import { REGISTER_USER_REQUEST } from './constants';
import { registerUserSuccesss, registerUserFailure } from './actions';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_DEV_BASE;
const registerURL = `${baseURL}/auth/users/`;

function registerUserRequest(username, email, password, rePassword) {
  return axios.post(registerURL, {
    username,
    email,
    password,
    re_password: rePassword,
  });
}

function* registerUserFlow(action) {
  const { meta } = action;
  try {
    const { username, email, password, rePassword } = action.payload;
    const response = yield call(
      registerUserRequest,
      username,
      email,
      password,
      rePassword,
    );

    yield put(registerUserSuccesss(response, meta));
  } catch (err) {
    yield put(registerUserFailure(getAxiosError(err), meta));
  }
}

function* registerWatcher() {
  yield takeLatest(REGISTER_USER_REQUEST, registerUserFlow);
}

export default registerWatcher;
