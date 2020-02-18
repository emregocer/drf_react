import React from 'react';
import { Field } from 'formik';
import * as yup from 'yup';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

import { MaterialFormikTextInput } from '../../utils/form';

const styles = {
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  submitWrapper: {
    position: 'relative',
  },
};

export const schema = yup.object({
  name: yup
    .string('Enter name')
    .required('Name is required.')
    .min(4, 'Name must be at least 4 characters.')
    .max(64, "Name can't be longer than 64 characters."),
  description: yup
    .string('Enter description')
    .required('Description is required.')
    .min(4, 'Description must be at least 4 characters.')
    .max(128, "Name can't be longer than 128 characters."),
});

export const SubjectDialogForm = ({
  classes,
  handleSubmit,
  isSubmitting,
  onCancel,
}) => {
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              name="name"
              variant="outlined"
              id="name"
              label="name"
              fullWidth
              autoFocus
              disabled={isSubmitting}
              component={MaterialFormikTextInput}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="description"
              variant="outlined"
              id="description"
              label="description"
              fullWidth
              multiline
              rowsMax="2"
              disabled={isSubmitting}
              component={MaterialFormikTextInput}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isSubmitting}
          variant="outlined"
          color="secondary"
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
        <div className={classes.submitWrapper}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Save
          </Button>
          {isSubmitting && (
            <CircularProgress
              size={24}
              className={classes.buttonProgress}
            />
          )}
        </div>
      </DialogActions>
    </form>
  );
};

export default withStyles(styles)(SubjectDialogForm);
