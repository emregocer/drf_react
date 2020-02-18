import { put, take } from 'redux-saga/effects';
import { showSnackbar } from './actions';

const snackbarInAction = action =>
  action.payload && action.payload.snackbar;

export default function* snackbarWatcher() {
  while (true) {
    const action = yield take(snackbarInAction);
    const { success, failure } = action.payload.snackbar;
    if (action.type.endsWith('SUCCESS') && success) {
      yield put(showSnackbar('success', success));
    }
    if (action.type.endsWith('FAILURE') && failure) {
      yield put(showSnackbar('error', failure));
    }
  }
}
