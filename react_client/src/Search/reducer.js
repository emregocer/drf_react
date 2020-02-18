import { SET_SEARCH_ACTION_DATA } from './constants';

export const getActionKey = state => state.search.actionKey;
export const getActionPayload = state => state.search.actionPayload;

const initialState = {
  actionKey: 'subjects',
  actionPayload: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_ACTION_DATA: {
      const { actionKey, actionPayload } = action.payload;
      return {
        ...state,
        actionKey,
        actionPayload: {
          ...state.actionPayload,
          ...actionPayload,
        },
      };
    }
    default:
      return state;
  }
};
