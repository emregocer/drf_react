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

export const LoginForm = ({
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
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              autoComplete="uname"
              name="username"
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              disabled={isSubmitting}
              component={MaterialFormikTextInput}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="password"
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              autoComplete="current-password"
              fullWidth
              disabled={isSubmitting}
              component={MaterialFormikTextInput}
            />
          </Grid>
        </Grid>
        <div className={classes.submitWrapper}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            fullWidth
          >
            Login
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
            <Link to="/register" variant="body2">
              Don&#39;t have an account? Sign up`
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default withStyles(styles)(LoginForm);
