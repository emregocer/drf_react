import * as subjectActions from './constants';
import { getSubject } from './selectors';
import Schemas from '../schemas';
import { CALL_API } from '../utils/apiSaga';

export const fetchSubjects = (ordering, search, page) => {
  let endpoint;
  endpoint = `subjects?ordering=${ordering}`;
  if (search) endpoint += `&search=${search}`;
  endpoint += `&page=${page}`;

  return {
    type: subjectActions.FETCH_SUBJECTS_REQUEST,
    [CALL_API]: {
      types: [
        subjectActions.FETCH_SUBJECTS_SUCCESS,
        subjectActions.FETCH_SUBJECTS_FAILURE,
      ],
      endpoint,
      method: 'GET',
      schema: Schemas.SUBJECT_ARRAY,
      schemaKey: 'results',
    },
    payload: {
      ordering,
      search,
      page,
    },
  };
};

export const fetchSubject = id => ({
  type: subjectActions.FETCH_SUBJECT_REQUEST,
  [CALL_API]: {
    types: [
      subjectActions.FETCH_SUBJECT_SUCCESS,
      subjectActions.FETCH_SUBJECT_FAILURE,
    ],
    endpoint: `subjects/${id}`,
    method: 'GET',
    schema: Schemas.SUBJECT,
  },
});

export const loadSubject = id => (dispatch, getState) => {
  const subject = getSubject(getState(), id);
  if (subject) return null;
  return dispatch(fetchSubject(id));
};

export const createSubject = subject => ({
  type: subjectActions.CREATE_SUBJECT_REQUEST,
  [CALL_API]: {
    types: [
      subjectActions.CREATE_SUBJECT_SUCCESS,
      subjectActions.CREATE_SUBJECT_FAILURE,
    ],
    endpoint: `subjects/`,
    method: 'POST',
    data: subject,
    schema: Schemas.SUBJECT,
  },
  meta: {
    thunk: true,
  },
  payload: {
    snackbar: {
      success: 'Subject created',
      failure: 'Could not create subject',
    },
  },
});

export const editSubject = subject => ({
  type: subjectActions.EDIT_SUBJECT_REQUEST,
  [CALL_API]: {
    types: [
      subjectActions.EDIT_SUBJECT_SUCCESS,
      subjectActions.EDIT_SUBJECT_FAILURE,
    ],
    endpoint: `subjects/${subject.id}/`,
    method: 'PUT',
    data: subject,
    schema: Schemas.SUBJECT,
  },
  payload: {
    snackbar: {
      success: 'Subject edited',
      failure: 'Could not edit subject',
    },
  },
  meta: {
    thunk: true,
  },
});

export const deleteSubject = id => ({
  type: subjectActions.DELETE_SUBJECT_REQUEST,
  [CALL_API]: {
    types: [
      subjectActions.DELETE_SUBJECT_SUCCESS,
      subjectActions.DELETE_SUBJECT_FAILURE,
    ],
    endpoint: `subjects/${id}/`,
    method: 'DELETE',
  },
  payload: {
    id,
    snackbar: {
      success: 'Subject deleted',
      failure: 'Could not delete subject',
    },
  },
  meta: {
    thunk: true,
  },
});

export const propChange = values => ({
  type: subjectActions.SUBJECTS_PAGINATION_PROP_CHANGE,
  payload: {
    values,
  },
});
