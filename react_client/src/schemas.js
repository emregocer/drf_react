import { schema } from 'normalizr';

const subjectSchema = new schema.Entity(
  'subjects',
  {},
  {
    idAttribute: subject => subject.id,
  },
);

const noteSchema = new schema.Entity(
  'notes',
  {
    subject: subjectSchema,
  },
  {
    idAttribute: note => note.id,
  },
);

export default {
  SUBJECT: subjectSchema,
  SUBJECT_ARRAY: [subjectSchema],
  NOTE: noteSchema,
  NOTE_ARRAY: [noteSchema],
};
