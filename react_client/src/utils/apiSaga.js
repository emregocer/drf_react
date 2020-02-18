import axios from 'axios';
import {
  call,
  put,
  take,
  fork,
  select,
  race,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { getAxiosError } from './getAxiosError';

import {
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_FAILURE,
  TOKEN_REFRESH_REQUEST,
} from '../Login/constants';
import { tokenRefreshRequest } from '../Login/actions';
import { getToken } from '../Login/selectors';

import { createLoadingSelector } from './selectors';

export const CALL_API = 'Call API';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_DEV_BASE;

const apiBaseURL = `${baseURL}/api/v1/`;

const makeRequest = config => {
  return axios
    .create({
      baseURL: apiBaseURL,
      timeout: 3000,
    })
    .request(config)
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

function* waitForTokenRefreshAndRetry(
  callApi,
  endpoint,
  method,
  dataOrParams,
  data,
) {
  const { success, failure } = yield race({
    success: take(TOKEN_REFRESH_SUCCESS),
    failure: take(TOKEN_REFRESH_FAILURE),
  });

  if (success) {
    return yield call(callApi, endpoint, method, dataOrParams, data);
  }

  if (failure) {
    return { error: failure.payload.error };
  }

  return {};
}

function* callApi(endpoint, method, dataOrParams, data) {
  // get the token from the store and set the header
  const token = yield select(getToken);
  const config = {
    url: endpoint,
    method,
    [dataOrParams]: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // make the request, also watch for the token change
  const { apiRequest, tokenWillRefresh } = yield race({
    apiRequest: call(makeRequest, config),
    tokenWillRefresh: take(TOKEN_REFRESH_REQUEST),
  });

  if (tokenWillRefresh) {
    return yield call(
      waitForTokenRefreshAndRetry,
      callApi,
      endpoint,
      method,
      dataOrParams,
      data,
    );
  }

  const { response, error } = apiRequest;

  if (error) {
    if (
      error.response &&
      error.response.status &&
      error.response.status === 401 &&
      error.response.data.code === 'token_not_valid'
    ) {
      const isRefreshing = createLoadingSelector([
        TOKEN_REFRESH_REQUEST,
      ])(yield select());

      if (!isRefreshing) {
        // if it isn't already refreshing send the action and wait for the new token and retry
        yield put(tokenRefreshRequest());
        return yield call(
          waitForTokenRefreshAndRetry,
          callApi,
          endpoint,
          method,
          dataOrParams,
          data,
        );
      }
    }
    return { error };
  }
  return { response };
}

const actionWith = (action, actionData) => {
  const finalAction = { ...action, ...actionData };
  delete finalAction[CALL_API];
  return finalAction;
};

export function* fetchFlow(
  action,
  endpoint,
  method,
  data,
  dataOrParams,
  schema,
  schemaKey,
  payload,
  meta,
  successType,
  failureType,
) {
  const { response, error } = yield call(
    callApi,
    endpoint,
    method,
    dataOrParams,
    data,
  );

  if (response) {
    let normalized;

    if (schema) {
      const responseData = schemaKey
        ? response.data[schemaKey]
        : response.data;
      normalized = normalize(responseData, schema);
    }

    yield put(
      actionWith(action, {
        type: successType,
        payload: {
          ...payload,
          response,
          normalized,
        },
        meta,
      }),
    );
  }

  if (error) {
    const errorPayload = error.clientError
      ? error
      : getAxiosError(error);

    yield put(
      actionWith(action, {
        type: failureType,
        payload: {
          ...payload,
          error: errorPayload,
        },
        error: true,
        meta,
      }),
    );
  }
}

export default function* apiWatcher() {
  while (true) {
    const action = yield take(action =>
      /(SEARCH|FETCH|CREATE|EDIT|DELETE)_(.*)_REQUEST/.test(
        action.type,
      ),
    );
    const callAPI = action[CALL_API];

    const {
      endpoint,
      method,
      data,
      types,
      schema,
      schemaKey,
    } = callAPI;

    const { payload, meta } = action;

    const dataOrParams = ['GET', 'DELETE'].includes(method)
      ? 'params'
      : 'data';

    if (typeof endpoint !== 'string') {
      throw new Error('Specify a string endpoint URL.');
    }
    if (!Array.isArray(types) || types.length !== 2) {
      throw new Error(
        'Expected an array of failure and success actions.',
      );
    }
    if (!types.every(type => typeof type === 'string')) {
      throw new Error('Expected action types to be strings.');
    }

    const [successType, failureType] = types;

    yield fork(
      fetchFlow,
      action,
      endpoint,
      method,
      data,
      dataOrParams,
      schema,
      schemaKey,
      payload,
      meta,
      successType,
      failureType,
    );
  }
}
