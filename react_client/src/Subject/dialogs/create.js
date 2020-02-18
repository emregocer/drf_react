import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getNonFieldErrors } from '../../utils/form';

import Errors from '../../Error';
import SubjectDialogForm, { schema } from './form';

import { hideDialog } from '../../Dialog/actions';

import { CREATE_SUBJECT_FAILURE } from '../constants';
import { createSubject } from '../actions';

import { createErrorMessageSelector } from '../../utils/selectors';

const fields = ['name', 'description'];

export const CreateSubjectDialog = ({
  createSubject,
  hideDialog,
  errors,
}) => {
  const submit = (values, actions) => {
    return createSubject(values)
      .then(() => {
        hideDialog();
      })
      .catch(() => {
        actions.setErrors(errors);
      });
  };

  const subject = { name: '', description: '' };
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
        <DialogTitle id="form-dialog-title">
          Create Subject
        </DialogTitle>
        {errors && (
          <Errors errorData={nonFieldErrors} margin="LRMargin" />
        )}
        <Formik
          initialValues={subject}
          validationSchema={schema}
          onSubmit={submit}
        >
          {props => (
            <SubjectDialogForm {...props} onCancel={hideDialog} />
          )}
        </Formik>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  errors: createErrorMessageSelector([CREATE_SUBJECT_FAILURE])(state),
});

const mapDispatchToProps = {
  createSubject,
  hideDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateSubjectDialog);
