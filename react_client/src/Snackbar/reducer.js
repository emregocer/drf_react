import { SHOW_SNACKBAR, HIDE_SNACKBAR } from './constants';

const initialState = {
  variant: null,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR: {
      const { variant, message } = action.payload;
      return {
        variant,
        message,
      };
    }
    case HIDE_SNACKBAR:
      return initialState;
    default:
      return state;
  }
};
