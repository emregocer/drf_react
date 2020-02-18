import React from 'react';
import { connect } from 'react-redux';

import CreateSubjectDialog from '../Subject/dialogs/create';
import DeleteSubjectDialog from '../Subject/dialogs/delete';
import EditSubjectDialog from '../Subject/dialogs/edit';
import CreateNoteDialog from '../Note/dialogs/create';
import EditNoteDialog from '../Note/dialogs/edit';
import DeleteNoteDialog from '../Note/dialogs/delete';

import { getDialog } from './selectors';

const DIALOG_COMPONENTS = {
  CREATE_SUBJECT: CreateSubjectDialog,
  EDIT_SUBJECT: EditSubjectDialog,
  DELETE_SUBJECT: DeleteSubjectDialog,
  CREATE_NOTE: CreateNoteDialog,
  EDIT_NOTE: EditNoteDialog,
  DELETE_NOTE: DeleteNoteDialog,
};

const DialogRoot = ({ dialogType, dialogProps }) => {
  if (!dialogType) {
    return null;
  }

  const SpecificDialog = DIALOG_COMPONENTS[dialogType];
  return <SpecificDialog {...dialogProps} />;
};

const mapStateToProps = state => getDialog(state);

export default connect(mapStateToProps, null)(DialogRoot);
