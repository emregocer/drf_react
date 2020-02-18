import axios from 'axios';
import { call, put, select, take, delay } from 'redux-saga/effects';

import { TOKEN_REFRESH_REQUEST } from '../constants';
import {
  tokenRefreshSuccess,
  tokenRefreshFailure,
  tokenExpired,
  tokenNotFound,
} from '../actions';
import { getRefreshToken } from '../selectors';

import { refreshUrl } from '../urls';

import { getAxiosError } from '../../utils/getAxiosError';

function setTokenToLocalStorage(token) {
  const storedAuth = localStorage.getItem('react_app.auth');

  // auth data was deleted in between token refresh requests
  if (!storedAuth) {
    return {
      error: {
        clientError:
          'No auth data found. You will be redirected to login in 3 seconds.',
      },
    };
  }

  localStorage.setItem(
    'react_app.auth',
    JSON.stringify({
      ...JSON.parse(storedAuth),
      token,
    }),
  );

  return {};
}

export function refreshTokenRequest(refreshToken) {
  return axios
    .post(refreshUrl, {
      refresh: refreshToken,
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

export default function* refreshTokenWatcher() {
  while (true) {
    yield take(TOKEN_REFRESH_REQUEST);
    const refreshToken = yield select(getRefreshToken);
    const { response, error } = yield call(
      refreshTokenRequest,
      refreshToken,
    );

    if (response) {
      const token = response.data.access;
      const { error } = yield call(setTokenToLocalStorage, token);

      // no auth data found, wait for 3 seconds and fire token not found action
      // it will redirect to login page

      if (error) {
        yield put(tokenRefreshFailure(error));
        yield delay(3000);
        yield put(tokenNotFound());
      } else {
        yield put(tokenRefreshSuccess(token));
      }
    }

    if (error) {
      const errorData = getAxiosError(error);
      if (errorData.code === 'token_not_valid') {
        yield put(
          tokenRefreshFailure({
            clientError:
              'Token is invalid or expired. You will be redirected to login in 3 seconds.',
          }),
        );
        yield delay(3000);
        yield put(tokenExpired());
      } else {
        yield put(tokenRefreshFailure(getAxiosError(error)));
      }
    }
  }
}
