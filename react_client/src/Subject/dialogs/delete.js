import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Errors from '../../Error';

import { hideDialog } from '../../Dialog/actions';

import { DELETE_SUBJECT_FAILURE } from '../constants';
import { deleteSubject } from '../actions';

import { createErrorMessageSelector } from '../../utils/selectors';

const DeleteSubjectDialog = ({
  id,
  hideDialog,
  deleteSubject,
  errors,
}) => {
  return (
    <Dialog
      open
      onClose={() => hideDialog()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Delete subject?
      </DialogTitle>
      {errors && <Errors errorData={errors} margin="LRBMargin" />}
      <DialogContent>
        <DialogContentText>
          Do you really want to delete this subject?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => hideDialog()} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() =>
            deleteSubject(id)
              .then(() => hideDialog())
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

const mapStateToProps = state => ({
  errors: createErrorMessageSelector([DELETE_SUBJECT_FAILURE])(state),
});

const mapDispatchToProps = {
  deleteSubject,
  hideDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteSubjectDialog);
