import { SHOW_DIALOG, HIDE_DIALOG } from './constants';

const initialState = {
  dialogType: '',
  dialogProps: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG: {
      const { dialogType, dialogProps } = action.payload;
      return {
        dialogType,
        dialogProps,
      };
    }
    case HIDE_DIALOG:
      return initialState;
    default:
      return state;
  }
};
