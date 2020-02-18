import { SHOW_SNACKBAR, HIDE_SNACKBAR } from './constants';

export const showSnackbar = (variant, message) => {
  return {
    type: SHOW_SNACKBAR,
    payload: {
      variant,
      message,
    },
  };
};

export const hideSnackbar = () => {
  return {
    type: HIDE_SNACKBAR,
  };
};
