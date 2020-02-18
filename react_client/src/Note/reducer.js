import union from 'lodash/union';

import * as noteActions from './constants';

const initialState = {
  ids: [],
  count: 0,
  page: 1,
  totalPages: 1,
  ordering: '-updated',
  search: '',
};

const updatePage = (state = initialState, action) => {
  switch (action.type) {
    case noteActions.NOTES_PAGINATION_PROP_CHANGE: {
      const { values } = action.payload;
      return {
        ...initialState,
        ...values,
      };
    }
    case noteActions.FETCH_NOTES_REQUEST: {
      const { ordering, search, page } = action.payload;
      if (page === 1) {
        return {
          ...initialState,
          ordering,
          search,
        };
      }
      return {
        ...state,
        ordering,
        search,
        page,
      };
    }
    case noteActions.FETCH_NOTES_SUCCESS: {
      const {
        count,
        total_pages: totalPages,
      } = action.payload.response.data;
      return {
        ...state,
        totalPages,
        count,
        ids: union(state.ids, action.payload.normalized.result),
      };
    }
    case noteActions.CREATE_NOTE_SUCCESS: {
      return {
        ...state,
        count: state.count + 1,
        ids: [action.payload.normalized.result, ...state.ids],
      };
    }
    case noteActions.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        count: state.count - 1,
        ids: state.ids.filter(item => item !== action.payload.id),
      };
    default:
      return state;
  }
};

export default (state = {}, action) => {
  // Update items by subject key
  switch (action.type) {
    case noteActions.NOTES_PAGINATION_PROP_CHANGE:
    case noteActions.FETCH_NOTES_REQUEST:
    case noteActions.FETCH_NOTES_SUCCESS:
    case noteActions.CREATE_NOTE_SUCCESS:
    case noteActions.DELETE_NOTE_SUCCESS: {
      const key = action.payload.subject;
      return {
        ...state,
        [key]: updatePage(state[key], action),
      };
    }
    default:
      return state;
  }
};
