import React from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'formik';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { green } from '@material-ui/core/colors';

import { MaterialFormikTextInput } from '../utils/form';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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
    margin: theme.spacing(3, 0, 2),
  },
});

export const RegisterForm = ({
  classes,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              autoComplete="uname"
              name="username"
              variant="outlined"
              fullWidth
              id="username"
              label="Username"
              disabled={isSubmitting}
              component={MaterialFormikTextInput}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              variant="outlined"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              disabled={isSubmitting}
              component={MaterialFormikTextInput}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              variant="outlined"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              disabled={isSubmitting}
              component={MaterialFormikTextInput}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              variant="outlined"
              fullWidth
              name="rePassword"
              label="Verify Password"
              type="password"
              id="rePassword"
              autoComplete="rePassword"
              disabled={isSubmitting}
              component={MaterialFormikTextInput}
            />
          </Grid>
        </Grid>
        <div className={classes.submitWrapper}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
          {isSubmitting && (
            <CircularProgress
              size={24}
              className={classes.buttonProgress}
            />
          )}
        </div>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default withStyles(styles)(RegisterForm);
