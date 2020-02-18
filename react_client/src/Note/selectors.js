import { createSelector } from 'reselect';

const getEntities = state => state.entities;
const getItems = state => state.items;
const selectItemId = (state, itemId) => itemId;

export const getNoteItemsBySubjectId = createSelector(
  [getItems],
  items => {
    return items.notesBySubjectId;
  },
);

export const getNoteEntities = createSelector(
  [getEntities],
  entities => entities.notes,
);

export const getNote = createSelector(
  [getNoteEntities, selectItemId],
  (noteEntities, itemId) => noteEntities[itemId],
);

export const getNoteListBySubjectId = createSelector(
  [getNoteItemsBySubjectId, selectItemId],
  (subjectItems, id) => subjectItems[id] || { ids: [] },
);

export const getNotesBySubjectId = createSelector(
  [getNoteListBySubjectId, getNoteEntities],
  (noteList, noteEntities) =>
    noteList.ids.map(id => noteEntities[id]),
);
