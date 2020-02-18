import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getNonFieldErrors } from '../../utils/form';

import Errors from '../../Error';
import NoteForm, { schema } from './form';

import { hideDialog } from '../../Dialog/actions';

import { EDIT_NOTE_FAILURE } from '../constants';
import { editNote } from '../actions';
import { getNote } from '../selectors';

import { createErrorMessageSelector } from '../../utils/selectors';

const fields = ['content'];

export const EditNoteDialog = ({
  editNote,
  hideDialog,
  note,
  errors,
}) => {
  const submit = (values, actions) => {
    return editNote(values)
      .then(() => {
        hideDialog();
      })
      .catch(() => {
        actions.setErrors(errors);
      });
  };

  const nonFieldErrors = getNonFieldErrors(errors, fields);
  return (
    <>
      <Dialog
        open
        onClose={() => hideDialog()}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
        {errors && (
          <Errors errorData={nonFieldErrors} margin="LRMargin" />
        )}
        <Formik
          initialValues={note}
          validationSchema={schema}
          onSubmit={submit}
        >
          {props => <NoteForm {...props} onCancel={hideDialog} />}
        </Formik>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  note: getNote(state, ownProps.id),
  errors: createErrorMessageSelector([EDIT_NOTE_FAILURE])(state),
});

const mapDispatchToProps = {
  editNote,
  hideDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditNoteDialog);
