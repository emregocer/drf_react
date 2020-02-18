import union from 'lodash/union';

import * as subjectActions from './constants';

const initialState = {
  ids: [],
  page: 1,
  totalPages: 1,
  count: 0,
  ordering: '-updated',
  search: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case subjectActions.SUBJECTS_PAGINATION_PROP_CHANGE: {
      const { values } = action.payload;
      return {
        ...initialState,
        ...values,
      };
    }
    case subjectActions.FETCH_SUBJECTS_REQUEST: {
      const { ordering, search, page } = action.payload;
      // discard previously loaded pages, keep the ordering and search properties
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
    case subjectActions.FETCH_SUBJECTS_SUCCESS: {
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
    case subjectActions.CREATE_SUBJECT_SUCCESS:
      return {
        ...state,
        count: state.count + 1,
        ids: [action.payload.normalized.result, ...state.ids],
      };
    case subjectActions.DELETE_SUBJECT_SUCCESS:
      return {
        ...state,
        count: state.count - 1,
        ids: state.ids.filter(item => item !== action.payload.id),
      };
    default:
      return state;
  }
};
