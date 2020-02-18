import { SET_SEARCH_ACTION_DATA } from './constants';

export const setSearchActionData = (actionKey, actionPayload) => {
  return {
    type: SET_SEARCH_ACTION_DATA,
    payload: {
      actionKey,
      actionPayload,
    },
  };
};
