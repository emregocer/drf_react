import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import { amber, green } from '@material-ui/core/colors';

import { hideSnackbar } from './actions';
import { getVariant, getMessage } from './selectors';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export const AppSnackbar = ({
  classes,
  variant,
  message,
  hideSnackbar,
}) => {
  if (!variant) {
    return null;
  }

  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(message)}
      aria-describedby="client-snackbar"
      autoHideDuration={4000}
      onClose={() => {
        hideSnackbar();
      }}
      className={classes.snackbar}
    >
      <SnackbarContent
        className={classes[variant]}
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon
              className={`${classes.icon}  ${classes.iconVariant}`}
            />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => {
              hideSnackbar();
            }}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export const StyledSnackbar = withStyles(styles)(AppSnackbar);

const mapStateToProps = state => ({
  variant: getVariant(state),
  message: getMessage(state),
});

const mapDispatchToProps = {
  hideSnackbar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledSnackbar);
