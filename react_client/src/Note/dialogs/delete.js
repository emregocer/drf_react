import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Errors from '../../Error';

import { hideDialog } from '../../Dialog/actions';

import { DELETE_NOTE_FAILURE } from '../constants';
import { deleteNote } from '../actions';
import { getNote } from '../selectors';

import { createErrorMessageSelector } from '../../utils/selectors';

const DeleteNoteDialog = ({
  note,
  hideDialog,
  deleteNote,
  errors,
}) => {
  const { id, subject } = note;
  return (
    <Dialog
      open
      onClose={() => hideDialog()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Delete note?</DialogTitle>
      {errors && <Errors errorData={errors} margin="LRBMargin" />}
      <DialogContent>
        <DialogContentText>
          Do you really want to delete this note?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => hideDialog()} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() =>
            deleteNote(id, subject)
              .then(() => {
                hideDialog();
              })
              .catch(() => {
                // catch doesn't have to do anything here
                // we get the error from the state
              })
          }
          color="secondary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state, ownProps) => ({
  note: getNote(state, ownProps.id),
  errors: createErrorMessageSelector([DELETE_NOTE_FAILURE])(state),
});

const mapDispatchToProps = {
  deleteNote,
  hideDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteNoteDialog);
