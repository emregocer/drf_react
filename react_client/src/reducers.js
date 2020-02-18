import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import merge from 'lodash/merge';
import { errorReducer, loadingReducer } from './utils/reducers';
import auth from './Login/reducer';
import subjectReducer from './Subject/reducer';
import noteReducer from './Note/reducer';
import snackbar from './Snackbar/reducer';
import drawer from './Drawer/reducer';
import dialog from './Dialog/reducer';
import search from './Search/reducer';
import {
  LOGOUT_SUCCESS,
  TOKEN_EXPIRED,
  TOKEN_NOT_FOUND,
} from './Login/constants';

const entities = (state = { notes: {}, subjects: {} }, action) => {
  if (action.payload && action.payload.normalized) {
    return merge({}, state, action.payload.normalized.entities);
  }
  return state;
};

const items = combineReducers({
  notesBySubjectId: noteReducer,
  subjects: subjectReducer,
});

const ui = combineReducers({
  drawer,
  snackbar,
  dialog,
});

const appReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ui,
    error: errorReducer,
    loading: loadingReducer,
    auth,
    items,
    entities,
    search,
  });

const rootReducer = history => (state, action) => {
  // clean the store when logout, token expiration or token deletion happens
  if (
    action.type === LOGOUT_SUCCESS ||
    action.type === TOKEN_EXPIRED ||
    action.type === TOKEN_NOT_FOUND
  ) {
    const { router } = state;
    state = { router };
  }

  return appReducer(history)(state, action);
};

export default rootReducer;
