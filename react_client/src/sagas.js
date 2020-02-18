import { all } from 'redux-saga/effects';
import registerWatcher from './Register/sagas';
import loginWatcher from './Login/sagas/login';
import apiWatcher from './utils/apiSaga';
import refreshTokenWatcher from './Login/sagas/token';
import snackbarWatcher from './Snackbar/snackbarWatcher';

export default function* rootSaga() {
  yield all([
    registerWatcher(),
    loginWatcher(),
    refreshTokenWatcher(),
    apiWatcher(),
    snackbarWatcher(),
  ]);
}
