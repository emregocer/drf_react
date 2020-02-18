import { createSelector } from 'reselect';

const getEntities = state => state.entities;
const getItems = state => state.items;
const selectItemId = (state, itemId) => itemId;

export const getSubjectItems = createSelector(
  [getItems],
  items => items.subjects,
);

export const getSubjectEntities = createSelector(
  [getEntities],
  entities => entities.subjects,
);

export const getSubject = createSelector(
  [getSubjectEntities, selectItemId],
  (subjectEntities, itemId) => subjectEntities[itemId],
);

export const getSubjects = createSelector(
  [getSubjectItems, getSubjectEntities],
  (subjectItems, subjectEntities) => {
    return subjectItems.ids.map(id => subjectEntities[id]) || [];
  },
);
