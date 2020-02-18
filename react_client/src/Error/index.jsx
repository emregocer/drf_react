import React from 'react';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';

const styles = theme => ({
  base: {
    marginTop: theme.spacing(2),
  },
  LRMargin: {
    margin: theme.spacing(0, 3, 0, 3),
  },
  LRBMargin: {
    margin: theme.spacing(0, 3, 2, 3),
  },
});

export const Errors = ({ errorData, tryAgain, classes, margin }) => {
  const errors = Object.keys(errorData).map(key => {
    return isArray(errorData[key]) ? (
      errorData[key].map(message => (
        <p key={`${key}-Error-${message}`}>{message}</p>
      ))
    ) : (
      <p key={`${key}-Error`}>{errorData[key]}</p>
    );
  });

  return !isEmpty(errors) ? (
    <Alert
      variant="outlined"
      severity="error"
      className={margin ? classes[margin] : classes.base}
    >
      <AlertTitle>Error</AlertTitle>
      {errors}
      {tryAgain ? (
        <Button
          variant="contained"
          color="primary"
          onClick={tryAgain}
        >
          Try again
        </Button>
      ) : null}
    </Alert>
  ) : null;
};

const ErrorsWithStyles = withStyles(styles)(Errors);

export default ErrorsWithStyles;
