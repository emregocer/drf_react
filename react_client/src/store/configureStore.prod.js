import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { middleware as sagaThunkMiddleware } from 'redux-saga-thunk';
import thunk from 'redux-thunk';
import history from './history';

import rootReducer from '../reducers';

export const sagaMiddleware = createSagaMiddleware();

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        sagaThunkMiddleware,
        sagaMiddleware,
      ),
    ),
  );

  return store;
};

export default configureStore;
