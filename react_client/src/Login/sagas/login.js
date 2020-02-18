import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { call, put, take, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { getAxiosError } from '../../utils/getAxiosError';

import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  TOKEN_EXPIRED,
  TOKEN_NOT_FOUND,
} from '../constants';

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
} from '../actions';

import { loginURL } from '../urls';

const NOT_SUPPORTED =
  "localStorage isn't supported or it's disabled. Enable the localStorage and refresh the page.";

function isLocalStorageSupported() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
}

// returns an empty object if key not present
// so saga don't get property errors while destructing
const getAuthDataFromLocalStorage = () => {
  if (!isLocalStorageSupported())
    return { error: { clientError: NOT_SUPPORTED } };

  let auth = {};

  const storedAuth = localStorage.getItem('react_app.auth');
  if (storedAuth) {
    auth = JSON.parse(storedAuth);
  }

  return auth;
};

function loginRequest(username, password) {
  return axios
    .post(loginURL, {
      username,
      password,
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

// gets the credentials from the action, tries to login and sets the localStorage data.
// if it fails, we put a fail action to show an error
// then loginWatcher waits for another login request action again since it's in a loop
function* loginFlow(action) {
  const { meta } = action;

  if (!isLocalStorageSupported()) {
    yield put(loginFailure({ clientError: NOT_SUPPORTED }, meta));
    return;
  }

  const { username, password } = action.payload;
  const { response, error } = yield call(
    loginRequest,
    username,
    password,
  );
  if (error) yield put(loginFailure(getAxiosError(error), meta));
  if (response) {
    const { access: token, refresh: refreshToken } = response.data;
    try {
      localStorage.setItem(
        'react_app.auth',
        JSON.stringify({
          username,
          token,
          refreshToken,
        }),
      );
      yield put(loginSuccess(username, token, refreshToken, meta));
    } catch (e) {
      if (e.code === 22 || e.code === 1014) {
        yield put(
          loginFailure(
            {
              clientError:
                'localStorage is full. Could not save data.',
            },
            meta,
          ),
        );
      }
    }
  }
}

function* logoutFlow() {
  localStorage.removeItem('react_app.auth');
  yield put(logoutSuccess());
  yield put(push('/login'));
}

const hasTokenExpired = token => {
  const decodedToken = jwt_decode(token);
  const tokenExpirationMS = decodedToken.exp * 1000;

  if (Date.now() > tokenExpirationMS) {
    return true;
  }
  return false;
};

export default function* loginWatcher() {
  while (true) {
    let { token, username, refreshToken, error } = yield call(
      getAuthDataFromLocalStorage,
    );

    // localStorage disabled
    if (error) {
      yield put(loginFailure(error));
    }

    // check if the token is expired or not
    if (token && username && refreshToken) {
      if (hasTokenExpired(token) && hasTokenExpired(refreshToken)) {
        yield call(logoutFlow);
        // unset the stale data
        token = username = refreshToken = null;
      } else {
        yield put(loginSuccess(username, token, refreshToken));
      }
    }

    // if there is no token then there wasn't any saved info in the localStorage so the app can take LOGIN_REQUEST
    if (!token) {
      // stop the loop and wait until it gets a LOGIN_REQUEST action
      const loginAction = yield take(LOGIN_REQUEST);
      yield fork(loginFlow, loginAction);
    }
    // else, there was user and token info in the localStorage
    // after LOGIN_REQUEST we need to only wait for LOGOUT_REQUEST or LOGIN_FAILURE.
    // token also can expire or deleted inbetween refresh calls

    const action = yield take([
      LOGIN_FAILURE, // could do stuff like logging with it
      LOGOUT_REQUEST,
      TOKEN_EXPIRED,
      TOKEN_NOT_FOUND,
    ]);

    if (
      action.type === LOGOUT_REQUEST ||
      action.type === TOKEN_EXPIRED ||
      action.type === TOKEN_NOT_FOUND
    ) {
      yield call(logoutFlow);
    }
  }
}
