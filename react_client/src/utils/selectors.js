// https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
import _ from 'lodash';
import { createSelector } from 'reselect';

export const createLoadingSelector = actions => state => {
  return _(actions)
    .map(action => action.replace('_REQUEST', '')) // doing this to use constants already defined instead of half strings
    .some(action => _.get(state, `loading.${action}`));
};

export const createErrorMessageSelector = actions => state => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we show the first error
  return (
    _(actions)
      .map(action => action.replace('_FAILURE', ''))
      .map(action => _.get(state, `error.${action}`))
      .compact()
      .first() || false
  );
};

const getRouter = state => state.router;
export const getRouterAction = createSelector(
  [getRouter],
  router => router.action,
);

export const getLocation = createSelector(
  [getRouter],
  router => router.location,
);

export const getLocationState = createSelector(
  [getLocation],
  location => location.state,
);

export const getPathname = createSelector(
  [getLocation],
  location => location.pathname,
);
