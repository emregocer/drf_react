import { createSelector } from 'reselect';

export const getAuth = state => {
  return state.auth;
};

export const getUsername = createSelector(
  [getAuth],
  auth => auth.username || '',
);

export const getToken = createSelector([getAuth], auth => auth.token);

export const getRefreshToken = createSelector(
  [getAuth],
  auth => auth.refreshToken,
);
