import * as noteActions from './constants';
import Schemas from '../schemas';
import { CALL_API } from '../utils/apiSaga';

export const fetchNotes = (subject, ordering, search, page) => {
  let endpoint;
  endpoint = `notes/?subject=${subject}&ordering=${ordering}`;
  if (search) endpoint += `&search=${search}`;
  endpoint += `&page=${page}`;
  return {
    type: noteActions.FETCH_NOTES_REQUEST,
    [CALL_API]: {
      types: [
        noteActions.FETCH_NOTES_SUCCESS,
        noteActions.FETCH_NOTES_FAILURE,
      ],
      endpoint,
      method: 'GET',
      schema: Schemas.NOTE_ARRAY,
      schemaKey: 'results',
    },
    payload: {
      ordering,
      search,
      subject,
      page,
    },
  };
};

export const fetchNote = id => ({
  type: noteActions.FETCH_NOTE_REQUEST,
  [CALL_API]: {
    types: [
      noteActions.FETCH_NOTE_SUCCESS,
      noteActions.FETCH_NOTE_FAILURE,
    ],
    endpoint: `notes/${id}`,
    method: 'GET',
    schema: Schemas.NOTE,
  },
});

export const createNote = note => ({
  type: noteActions.CREATE_NOTE_REQUEST,
  [CALL_API]: {
    types: [
      noteActions.CREATE_NOTE_SUCCESS,
      noteActions.CREATE_NOTE_FAILURE,
    ],
    endpoint: `notes/`,
    method: 'POST',
    data: note,
    schema: Schemas.NOTE,
  },
  payload: {
    subject: note.subject,
    snackbar: {
      success: 'Note created',
      failure: 'Could not create note',
    },
  },
  meta: {
    thunk: true,
  },
});

export const editNote = note => ({
  type: noteActions.EDIT_NOTE_REQUEST,
  [CALL_API]: {
    types: [
      noteActions.EDIT_NOTE_SUCCESS,
      noteActions.EDIT_NOTE_FAILURE,
    ],
    endpoint: `notes/${note.id}/`,
    method: 'PUT',
    data: note,
    schema: Schemas.NOTE,
  },
  payload: {
    subject: note.subject,
    snackbar: {
      success: 'Note edited',
      failure: 'Could not edit note',
    },
  },
  meta: {
    thunk: true,
  },
});

export const deleteNote = (id, subject) => ({
  type: noteActions.DELETE_NOTE_REQUEST,
  [CALL_API]: {
    types: [
      noteActions.DELETE_NOTE_SUCCESS,
      noteActions.DELETE_NOTE_FAILURE,
    ],
    endpoint: `notes/${id}/`,
    method: 'DELETE',
  },
  payload: {
    id,
    subject,
    snackbar: {
      success: 'Note deleted',
      failure: 'Could not delete note',
    },
  },
  meta: {
    thunk: true,
  },
});

export const propChange = (values, payload) => ({
  type: noteActions.NOTES_PAGINATION_PROP_CHANGE,
  payload: {
    values,
    ...payload,
  },
});
